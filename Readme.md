# Room for Improvement

- Accomodate multiple users.
    - Add users table
    - Add foreign key userId on categories (nullable, since we could have global categories and user defined categories)
    - Add foreign key userId on items
    - handle authentication on app
- item autocomplete - async search of full item history
- Offline cababilities
    - Use service worker
    - cache latest list in browser
- Scaling
    - paginate/virtualized list for really long grocery list
    - limit size of a list

# Resources + Bootstrap Help:

https://github.com/docker/awesome-compose/blob/master/react-express-mysql
[Create React App](https://github.com/facebook/create-react-app)