require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Multiboard
  class Application < Rails::Application
    config.eager_load_paths += ["#{config.root}/lib/workers"]
    config.autoload_paths += %W(#{config.root}/app/workers)
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.assets.paths << Rails.root.join('node_modules')
  end
end
