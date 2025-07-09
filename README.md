All tentative atm

Project Structure

src/
├── components/
│ ├── common/
│ │ ├── NavBar.js
│ │ ├── Footer.js
│ │ └── FlashAlert.js
│ ├── blog/
│ │ ├── BlogCard.js
│ │ ├── BlogForm.js
│ │ └── BlogDetail.js
│ └── recipe/
│ ├── RecipeCard.js
│ ├── RecipeForm.js
│ └── RecipeDetail.js
├── pages/
│ ├── HomePage.js
│ ├── BlogsPage.js
│ ├── AddBlogPage.js
│ ├── EditBlogPage.js
│ ├── RecipesPage.js
│ ├── AddRecipePage.js
│ └── EditRecipePage.js
├── App.js
└── index.js

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
│ ├── BlogDetailPage
│ ├── RecipesPage
│ │ ├── RecipeCard
│ ├── AddRecipePage
│ │ └── RecipeForm
│ ├── EditRecipePage
│ │ └── RecipeForm
│ └── RecipeDetailPage
└── Footer
