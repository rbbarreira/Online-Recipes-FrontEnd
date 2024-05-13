import { Routes } from "@angular/router";
import { UsersComponent } from "../Account/users/users.component";
import { authGuard, authGuardRole } from "../guard/auth.guard";
import { UsersEditComponent } from "../Account/users-edit/users-edit.component";
import { RecipesComponent } from "../Models/recipes/recipes-main/recipes.component";
import { UsersSettingsComponent } from "../Account/users-settings/users-settings.component";
import { RecipesEditComponent } from "../Models/recipes/recipes-edit/recipes-edit.component";
import { IngredientsComponent } from "../Models/ingredient/ingredients-main/ingredients.component";
import { CategoriesComponent } from "../Models/category/categories-main/categories.component";
import { IngredientsEditComponent } from "../Models/ingredient/ingredients-edit/ingredients-edit.component";
import { CategoriesEditComponent } from "../Models/category/categories-edit/categories-edit.component";
import { SettingsComponent } from "../Account/settings/settings.component";
import { NotFoundComponent } from "../Components/not-found/not-found.component";

export const routeUser: Routes = [    
    
    { path: 'users', component: UsersComponent, title: 'Users', canActivate:[authGuardRole] },
    { path: 'usersSetting', component: UsersSettingsComponent, title: 'Board', canActivate:[authGuard] },
    { path: 'userEdit/:id', component: UsersEditComponent, title: 'Edit Users', canActivate:[authGuardRole] },
    { path: 'recipe', component: RecipesComponent, title: 'Recipe', canActivate:[authGuard] },
    { path: 'recipeCreate', component: RecipesEditComponent, title: 'Create Recipe', canActivate:[authGuard]  },
    { path: 'recipeEdit/:id', component: RecipesEditComponent, title: 'Edit Recipe', canActivate:[authGuardRole]  },
    { path: 'ingredients', component: IngredientsComponent, title: 'Ingredients', canActivate:[authGuardRole]  },
    { path: 'ingredientsCreate', component: IngredientsEditComponent, title: 'Create Ingredient', canActivate:[authGuardRole]  },
    { path: 'ingredientsEdit/:id', component: IngredientsEditComponent, title: 'Edit Ingredient', canActivate:[authGuardRole]  },
    { path: 'categories', component: CategoriesComponent, title: 'Categories', canActivate:[authGuardRole]  },
    { path: 'categoriesCreate', component: CategoriesEditComponent, title: 'Create Category', canActivate:[authGuardRole]  },
    { path: 'categoriesEdit/:id', component: CategoriesEditComponent, title: 'Edit Category', canActivate:[authGuardRole]  },
    { path: 'settings', component: SettingsComponent, title: 'Settings', canActivate:[authGuard] },
    { path: '**', pathMatch: 'full',  component: NotFoundComponent }, 
];
