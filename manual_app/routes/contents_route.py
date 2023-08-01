from flask import Blueprint, render_template, redirect, url_for

NAME = "manual"

bp = Blueprint(NAME, __name__, url_prefix='/manual')

@bp.route('/<manual_name>')
def load_manual(manual_name) :
  return render_template(f'/contents/{manual_name}.html')