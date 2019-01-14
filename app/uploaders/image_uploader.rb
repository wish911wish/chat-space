class ImageUploader < CarrierWave::Uploader::Base
  storage :fog
  include CarrierWave::MiniMagick
  process resize_to_fit: [300, 300]
end
