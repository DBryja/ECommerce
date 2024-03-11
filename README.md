# An e-commerce application 


- [Technical Information](#technical-information)
    - [Built with](#built-with)
    - [Features](#features)
- [My process](#my-process)
- [Author](#author)

## Technical information

### Built with

- Next.js 14, 
- Prisma with SQLite,

### Features

-  **Authorization**
    - User can register and log in as a client
    - User can log in as an admin
    - Different roles have access to different pages

-  **Admin Panel**
    -  Add and remove products, 
    -  Add and remove categories,
    -  Access and filter all orders,
    -  Add other admins

- **Client**:
    - Search for products in chosen category and filter them by price,
    - Add products to cart,
    - Place an order, (lacks payment system),
    - Access own orders,
    - 
- **Database**:
    - Users,
    - Products,
    - Orders,
    - Shipping Details,
    - Categories,
    - Enums (OrderStatus, Role)

- **Data Fetching**:
    - Data is fetched on the server side using server actions.
    - Some of the data like categories and single products  are cached.
    - Registered users shipping details are stored in the database and update if any changes are made on another order.

Upon adding new product its details are kept in the database and images are saved in the public folder under its ID.

## My Process

This was my first self-made project using Next.js and Prisma.
I have made this project to learn key concepts of these technologies, and to get familiar with the development process of a full-stack application.
I have left this application in a mid-stage of development as I was not satisfied with the outcome, as It doesn't reflect real world standards.

## Author

- https://github.com/DBryja/
- https://www.linkedin.com/in/dawid-bryja-898134249/
