from flask import Flask, render_template
from manual_app.routes import search_route, generate_pdf_multi_route, generate_pdf_private_route, main_route, contents_route


def create_app() :
  print('run: create_app()')
  app = Flask(__name__)
  app.secret_key = 'TEST'

  if app.config['DEBUG'] == True :
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
    app.config['TEMPLATES_AUTO_RELOAD'] = True

  '''ROUTES INIT'''
  app.register_blueprint(main_route.bp)
  app.register_blueprint(contents_route.bp)
  app.register_blueprint(generate_pdf_private_route.bp)
  app.register_blueprint(generate_pdf_multi_route.bp)
  app.register_blueprint(search_route.bp)


  return app