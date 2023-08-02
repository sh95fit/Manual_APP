from flask import Blueprint, render_template, redirect, url_for, request, session


NAME = 'main'

bp = Blueprint(NAME, __name__, url_prefix='/')

@bp.route('/')
def index() :
  return render_template('index.html')

@bp.route('/refresh')
def refresh() :
  return redirect(url_for(f'{NAME}.index'))

