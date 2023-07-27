from flask import Blueprint, render_template, redirect, url_for


NAME = 'main'

bp = Blueprint(NAME, __name__, url_prefix='/')

@bp.route('/')
def index() :
  return render_template('index.html')

