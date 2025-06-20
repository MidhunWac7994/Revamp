import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom';
import CategoryLanding from  '../../components/CategoryLanding/CategoryLanding'

const CategoryLandingPage = () => {
    const CATEGORY_LISTING_PAGE = gql`
      query GetCategoryListing($category_id: String) {
        categoryList(filters: { parent_id: { eq: $category_id } }) {
          id
          name
          url_key
          category_show_on_front_end
          image_data {
            category_short_image
            category_banner_image
          }
          children {
            id
            name
            url_key
            image_data {
              category_short_image
            }
          }
        }
      }
    `;
       const { slug: category_id, locale } = useParams();

const { data, loading, error } = useQuery(CATEGORY_LISTING_PAGE, {
  variables: { category_id },
  
});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading category</p>;

      const categoryData = data?.categoryList || [];
      console.log(categoryData)

  return (
    <div>
      <CategoryLanding categoryData={categoryData} locale={locale} />
    
    </div>
  );
}

export default CategoryLandingPage
