# Overview
Author: Emily Feder <emilyafeder@gmail.com>

This is a sample Grocery List Application using Docker, node.js, express.js, React, and mysql/mariadb.

# How to Run

1. First install [docker](https://docs.docker.com/desktop/) on your machine.
2. Then run `docker-compose up`. That should build and run all the containers
3. Visit [localhost:3000](localhost:3000)


# Room for Improvement

- UI
    - Styling: fix margin, spacing, and layout issues
    - Ability to edit items
    - Ability to drag to re-order items
    - ensure looks good cross browser and on mobile
- Functional Improvements
    - Item autocomplete - async search of full item history
    - Ability to add new categories
    - Ability to delete completed items
- Accomodate multiple users.
    - Add users table
    - Add foreign key userId on categories (nullable, since we could have global categories and user defined categories)
    - Add foreign key userId on items
    - handle authentication on app
- Offline cababilities
    - Use service worker
    - cache latest list in browser
    - optimistic updates + queue for syncing
- Add Automated Tests
- Make Production ready
    - enable config for different environments
    - fix some hardcoded configuration values
    - docker production level build
    - Error logging
- Scaling
    - paginate/virtualized list UI for really long grocery list
    - limit number of list items that can go in a list
    - look for opportunities for query caching

# Resources + Bootstrap Help:

https://github.com/docker/awesome-compose/blob/master/react-express-mysql
[Create React App](https://github.com/facebook/create-react-app)