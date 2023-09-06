export default defineNuxtRouteMiddleware((to, from) => {
    // skip middleware for below routes
    switch (to.path) {
        case '/':
        case '/assets':
            return;
    }

    // redirect to home page if user is not logged in
    if (!useState('user').value) {
        return navigateTo('/');
    }
});
