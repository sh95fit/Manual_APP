from flask import Blueprint, render_template, redirect, url_for, Response, after_this_request
from pathlib import Path
import pdfkit
import os
import uuid
import tempfile

NAME = "generate_pdf"

bp = Blueprint(NAME, __name__, url_prefix='/generate_pdf')


current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
page_list= [
  os.path.join(parent_dir, 'templates', 'contents', 'content1.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content2.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content3.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content4.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content5.html'),
]

@bp.route('/')
def generate_pdf() :
  pdfkit_options = {
    'page-size': 'A4',
    'encoding': 'UTF-8',
    "enable-local-file-access": True,
  }

  pdf_filename = "more_user_manual.pdf"

# pdf_path = os.path.join(parent_dir, 'static', pdf_filename)

  # uuid를 활용한 중복 제거 (하지만 삭제 시 문제 잔존)
  # unique_filename = str(uuid.uuid4()) + ".pdf"
  # pdf_path = os.path.join(parent_dir, 'static', unique_filename)

  # Create a temporary file and get its path
  with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
      pdf_path = temp_file.name


  if os.path.exists(pdf_path) :
    try :
      os.remove(pdf_path)
    except Exception as e :
      print(f"Error while deleting existing PDF : {e}")

  config = pdfkit.configuration(wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe')

  pdfkit.from_file(page_list, pdf_path, options=pdfkit_options, configuration=config)

  @after_this_request
  def remove_pdf(response) :
    try :
      os.remove(pdf_path)
    except Exception as e :
      print(f"Error while deleting PDF : {e}")
    return response

  with open(pdf_path, 'rb') as f:
      pdf_data = f.read()

  response = Response(pdf_data, content_type='application/pdf')
  response.headers['Content-Disposition'] = 'attachment; filename=more_user_manual.pdf'
  return response