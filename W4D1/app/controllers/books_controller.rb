class BooksController < ApplicationController
  def index
    @books = Book.all
  end

  def new
  end

  def create
    Book.create(book_params)
    redirect_to :action => 'index'
  end

  def destroy
    Book.destroy(params[:id])
    redirect_to :action => 'index'
  end

  private
  def book_params
    params.require(:book).permit(:title, :author)
  end
end
