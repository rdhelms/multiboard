require 'redis'
# require 'redis/objects'
#
# REDIS_CONFIG = YAML.load( File.open( Rails.root.join("config/redis.yml") ) ).symbolize_keys
# dflt = REDIS_CONFIG[:default].symbolize_keys
# cnfg = dflt.merge(REDIS_CONFIG[Rails.env.to_sym].symbolize_keys) if REDIS_CONFIG[Rails.env.to_sym]
#
# Redis.current = Redis.new(cnfg)
# Redis::Objects.redis = Redis.current
# #Redis.current_ns = Redis::Namespace.new(cnfg[:namespace], :redis => Redis.current) if cnfg[:namespace]
#
# # To clear out the db before each test
# Redis.current.flushdb if Rails.env == "test"
# Redis.current = Redis.new(:host => 'localhost', :port => 6379)
if Rails.env.production?
  uri = URI.parse(ENV['REDIS_URL'])
  Redis.current = Redis.new(:url => uri)
else
  Redis.current = Redis.new(:host => 'localhost', :port => 6379)
end
