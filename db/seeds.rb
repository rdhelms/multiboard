# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
dirt_path = File.join(Rails.root, 'app', 'assets', 'images', 'dirt_path.png')
Background.create(
  name: 'dirt_path',
  code: File.binread(dirt_path)
)

Scene.create(
  name: 'name',
  data: "{ name: 'hi mom',
  arrayOfStationaryObjects: [
    {x,y,width,height},
    {x,y,width,height},
    {x,y,width,height},
    {x,y,width,height}
  ],
  arrayOfMobileObjects: [
    {x,y,radius},
    {x,y,radius},
    {x,y,radius},
    {x,y,radius},
    {x,y,radius}
  ]
  }"
)
