source "https://rubygems.org"

# Use Jekyll directly instead of github-pages gem to avoid theme conflicts
gem "jekyll", "~> 3.9.0"
gem "jekyll-include-cache", group: :jekyll_plugins
gem "jekyll-paginate", group: :jekyll_plugins
gem "jekyll-sitemap", group: :jekyll_plugins
gem "jekyll-gist", group: :jekyll_plugins
gem "jekyll-feed", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
