import Hero from '../sections/Hero'
import CategoryNav from '../sections/CategoryNav'
import FeaturedProducts from '../sections/FeaturedProducts'
import CategoryPreviews from '../sections/CategoryPreviews'
import WhyUs from '../sections/WhyUs'
import Partners from '../sections/Partners'
import Testimonials from '../sections/Testimonials'
import BlogPreview from '../sections/BlogPreview'
import CTAForm from '../sections/CTAForm'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryNav />
      <FeaturedProducts />
      <WhyUs />
      <CategoryPreviews />
      <Partners />
      <Testimonials />
      <BlogPreview />
      <CTAForm />
    </main>
  )
}
