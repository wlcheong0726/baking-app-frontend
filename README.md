All tentative atm

Project Structure

src/
├── components/
│ ├── common/
│ │ ├── NavBar.jsx
│ │ ├── Footer.jsx
│ │ └── FlashAlert.jsx
│ ├── blog/
│ │ ├── BlogCard.jsx
│ │ ├── BlogForm.jsx
│ │ └── FullBlog.jsx
│ └── recipe/
│ ├── RecipeCard.jsx
│ ├── RecipeForm.jsx
│ └── FullRecipe.jsx
├── pages/
│ ├── HomePage.jsx
│ ├── BlogsPage.jsx
│ ├── FullBlogPage.jsx
│ ├── AddBlogPage.jsx
│ ├── EditBlogPage.jsx
│ ├── RecipesPage.jsx
│ ├── AddRecipePage.jsx
│ └── EditRecipePage.jsx
├── App.jsx
└── index.jsx

Component Hierarchy

App
├── NavBar
├── Routes
│ ├── HomePage
│ ├── BlogsPage
│ │ ├── BlogCard
│ ├── AddBlogPage
│ │ └── BlogForm
│ ├── EditBlogPage
│ │ └── BlogForm
│ ├── FullBlogPage
│ ├── RecipesPage
│ │ ├── RecipeCard
│ ├── AddRecipePage
│ │ └── RecipeForm
│ ├── EditRecipePage
│ │ └── RecipeForm
│ └── FullRecipePage
└── Footer
