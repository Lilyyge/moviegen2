from flask import Flask, request, render_template,jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load the movies.csv file
movies = pd.read_csv('movies.csv')

# Load the ratings.csv file
ratings = pd.read_csv('ratings.csv')

# Truncate the ratings dataset to include only the first 100 users
ratings_truncated = ratings[ratings['userId'] <= 100]

# Truncate the ratings dataset to include only movies with movieId less than or equal to 100000
ratings_truncated = ratings_truncated[ratings_truncated['movieId'] <= 100000]

# Truncate the movies dataset to include only movies with movieId less than or equal to 100000
movies = movies[movies['movieId'] <= 100000]

# Remove rows with '(no genres listed)' in the genres column
movies = movies[movies['genres'] != '(no genres listed)']

# Save the updated movies DataFrame back to the CSV file
movies.to_csv('movies.csv', index=False)

# Calculate average ratings and number of ratings for each movie
average_ratings = ratings.groupby('movieId')['rating'].mean().reset_index(name='average_rating')
rating_counts = ratings.groupby('movieId').size().reset_index(name='rating_count')

# Merge average ratings and rating counts with movies
movies = pd.merge(movies, average_ratings, on='movieId', how='left')
movies = pd.merge(movies, rating_counts, on='movieId', how='left')

#print(movies.head())

# # Fill NaN values with 0 for movies with no ratings
# movies['average_rating'].fillna(0, inplace=True)
# movies['rating_count'].fillna(0, inplace=True)

# Convert genres to a format suitable for vectorization
movies_clean = movies['genres'] = movies['genres'].str.replace('|', ' ')

# Normalize movies_clean
movies_normalized = movies_clean.apply(lambda x: x * max(1, 5 // len(x)))


#movies_normalized = movies_clean.apply(lambda x: ' '.join(x * max(1, 5 // len(x))))

# Vectorize genres using TF-IDF

tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(movies_normalized)


# Calculate cosine similarity based on genres
genre_similarity = cosine_similarity(tfidf_matrix)

def recommend_movies(movie_title, alpha=0.6, num_recommendations=5):
    beta = 0.7
    # Find the index of the input movie
    movie_idx = movies.index[movies['title'] == movie_title].tolist()[0]

    # Get genre similarity scores for the input movie
    genre_sim_scores = list(enumerate(genre_similarity[movie_idx]))

    # Combine genre similarity with weighted average rating
    weighted_scores = []
    average_rating_average = movies['average_rating'].mean()
    total_count = movies['rating_count'].sum()


    for idx, sim in genre_sim_scores:
        avg_rating = movies.at[idx, 'average_rating']
        rating_count = movies.at[idx, 'rating_count']
        weighted_avg_rating = (beta * avg_rating) + ((1 - beta) * (avg_rating - average_rating_average)*(rating_count / (total_count)))  # Adjust the 50 based on your dataset
        weighted_score = (alpha * sim) + ((1 - alpha) * weighted_avg_rating)
        weighted_scores.append((idx, weighted_score))

    # Sort movies based on weighted scores
    weighted_scores = sorted(weighted_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the top recommended movies
    recommended_movie_indices = [idx for idx, _ in weighted_scores[1:num_recommendations+1]]
    updated_indices = []
    
    # Remove the input movie from the recommended movies
    for idx in recommended_movie_indices:
        if movies['title'].iloc[idx] != movie_title:
            updated_indices.append(idx)
    recommended_movie_indices = updated_indices

    # Return the titles of the recommended movies
    return movies['title'].iloc[recommended_movie_indices].tolist()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/join', methods=['GET','POST'])
def my_form_post():
    text1 = request.form['text1']
    word = request.args.get('text1')
    result = recommend_movies(text1)
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)

