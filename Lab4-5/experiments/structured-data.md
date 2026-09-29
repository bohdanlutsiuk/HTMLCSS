# Technical SEO audit and structured data

## Answers
1. After a quick analysis I came to a conclusion that schema.org does really suit there. It's trying to sell a product after all.  
2. Because it is a software subscription it suits to the Product type.
3. Products can be described with name, description, image, offer details and many more.  
4. You could use microdata to create structured data right from html code. There you can specify all the same properties but JSON-LD is much easier to write and maintain. Although both formats are supported, it's generally recommended to use JSON-LD.  

## Does that data fit the page?
Yes, it does but it could use little improvement. For example, our product is a subscription but is sold like one time purchase. We could add priceSpecification with billing parameter to make that clearer.

## Short summary
We want schema.org to describe the page contents because it makes easier for users to understand what the page is about when seeing it as a search result and we also help google understand the page better. This way it's higher up in search results and more users see it. 
