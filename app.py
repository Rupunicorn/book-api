# app.py
import os
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

# book data
with open('books.json') as f:
     books = json.load(f)

# Health check
@app.route('/health')
def health():
    return jsonify({"status": "ok"})

# Get all books
@app.route('/books')
def get_books():
    query_title = request.args.get('title','').lower()
    query_genre = request.args.get('genre','').lower()
    sort_by = request.args.get('sort','')

    results = books
    
    if query_title:
       results = [b for b in results if query_title in b['title'].lower()]
    if query_genre:
       results = [b for b in results if query_genre == b['genre'].lower()]

    if sort_by == 'rating':
       results = sorted(results, key = lambda b:b['rating'], reverse = True)

    return jsonify(results)

if __name__ == '__main__':
   port = int(os.environ.get("PORT",8080))
   app.run(host="0.0.0.0", port=port)