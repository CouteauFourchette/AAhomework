module ApplicationHelper
  def auth_token
    form  = "<input type='hidden' name='authenticity_token' value='#{form_authenticity_token}' />"
    form.html_safe
  end
end
