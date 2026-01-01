/**
 * Blog Posts Data
 * Extracted from public_html/blog.html
 * Structure for future CMS integration
 */
export const blogPosts = [
  {
    slug: 'vw-menlyn-csir-charity-golf-day',
    title: 'VW Menlyn',
    excerpt: 'VW Menlyn in collaboration with Black Eagle Group in facilitating the CSIR Charity Golf Day',
    image: null, // YouTube video
    date: 'June 25, 2024',
    content: 'VW Menlyn in collaboration with Black Eagle Group in facilitating the CSIR Charity Golf Day',
    videoUrl: 'https://www.youtube.com/embed/fpn6ZC7XLQA?si=bvog-pZ-F9c5X1kr'
  },
  {
    slug: 'csir-charity-golf-event',
    title: 'CSIR\'s CHARITY GOLF EVENT',
    excerpt: 'The CSIR Charity Golf Day aims to enhance and reinforce the learning experience of mathematics and science in rural communities, by donating learning materials, ensuring a brighter future for learners.',
    image: '/images/CSIR.jpg',
    date: 'June 28, 2024',
    content: 'The CSIR Charity Golf Day aims to enhance and reinforce the learning experience of mathematics and science in rural communities, by donating learning materials, ensuring a brighter future for learners.'
  },
  {
    slug: 'team-building-golf-day',
    title: 'Team Building Golf Day',
    excerpt: 'Team building games are great opportunities to foster camaraderie, communication, and leadership skills. They bring everyone together outside of the typical working environment, building better relationships that ultimately lead to better team collaboration.',
    image: '/images/TeamBuilding.jpg',
    date: 'May 17, 2024',
    content: 'Team building games are great opportunities to foster camaraderie, communication, and leadership skills. They bring everyone together outside of the typical working environment, building better relationships that ultimately lead to better team collaboration.'
  },
  {
    slug: 'father-son-power-fm',
    title: 'Father & Son @ Power Fm',
    excerpt: 'The CEO and his son had a fruitful discussion on the Power Experience show with Messiah Gumede, reflecting on their personal journeys and the milestones of Black Eagle Group, including his tenure at work with Jaguar Land Rover.',
    image: '/images/Power.jpg',
    date: 'March 23, 2023',
    content: 'The CEO and his son had a fruitful discussion on the Power Experience show with Messiah Gumede, reflecting on their personal journeys and the milestones of Black Eagle Group, including his tenure at work with Jaguar Land Rover.'
  },
  {
    slug: 'activity-fogging-machine',
    title: 'Activity',
    excerpt: 'The use of a fogging machine is to generate a cloud of extremely small droplets of a disinfectant liquid. This method can significantly reduce the number of pathogens on the surface and in the air.',
    image: '/images/Blogging.jpg',
    date: 'June 16, 2021',
    content: 'The use of a fogging machine is to generate a cloud of extremely small droplets of a disinfectant liquid. This method can significantly reduce the number of pathogens on the surface and in the air. Fogging can be applied to all areas and will cover hard to reach areas. Thermal fogger – better for outdoor areas, large square meterage, farms e.g. poultry. ULV / Cold – regulate the volume, better for horizontal surfaces or fogging an entire rooms. e.g schools, offices. Portable unit (shoulder strap) – better for smaller areas – mobile cleaning team. Electrostatic - provides a better delivery of disinfectant products to surfaces, especially vertical surfaces to which the disinfectants. e.g. public restrooms, kitchens'
  }
]

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug)
}

