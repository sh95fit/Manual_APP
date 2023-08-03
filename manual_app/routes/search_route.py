from flask import Blueprint, render_template, redirect, url_for, request, jsonify
import os
from urllib.parse import unquote

NAME = 'search'

bp = Blueprint(NAME, __name__, url_prefix='/search')

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

folder_path = os.path.join(parent_dir, 'templates', 'contents')

def search_in_htmls(search_term, folder_path) :
  result = []
  folder_path = folder_path
  for filename in os.listdir(folder_path) :
    if filename.endswith('.html') :
      file_path = os.path.join(folder_path, filename)
      with open(file_path, 'r') as file :
        content = file.read().lower()
        if search_term in content :
          result.append(filename)
  return result


@bp.route('/')
def search() :
  search_term = request.args.get('term', '')
  decoded_search_term = unquote(search_term.lower())
  # print(decoded_search_term)
  search_results = search_in_htmls(decoded_search_term, folder_path)
  return jsonify(search_results)