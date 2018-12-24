FactoryGirl.define do

  factory :message do
    content               Faker::Lorem.sentence
    image                 File.open("#{Rails.root}/public/uploads/no_image.jpg")
    group
    user
  end

end
