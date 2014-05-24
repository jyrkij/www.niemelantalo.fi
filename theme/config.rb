# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/theme/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

require 'susy'
require 'autoprefixer-rails'
require 'csso'

on_stylesheet_saved do |file|
    css = File.read(file)
    File.open(file, 'w') do |io|
        # Produces optimized CSS ready for production
        #io << Csso.optimize(AutoprefixerRails.process(css).css, true)

        # Produces development friendly CSS
        io << AutoprefixerRails.process(css)
    end
end
