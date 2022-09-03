# WebStrike![misterArigatoDbSchema](https://user-images.githubusercontent.com/87771611/188217758-8c3a7ef5-3011-4ad8-9d07-6cd5cf829996.png)

---

## Database Schema Shortened Explanation

- A user :

is assigned 1 basket.
can have multiple orders.
can have multiple addresses.
An address can have multiple orders.

- A basket can have multiple BasketItems.

- A BasketItem can be made up of many products.

- An Order is comprised of multiple OrderItems.

### Database Schema Longer Explanation
- Product Products will have:

an ID: to identify a product with a number
Name: name of the product
SKU: SKU of the product
Price: how much a product costs
Description: description about a product
ImgUrl: a picture of the product

- Application User Users will have:

First Name: the user's first name
Last Name: the user's last name
Basket Baskets will have:

an ID: to identify every basket, so that we can grab its contents later
CustomerEmail: baskets are given to users upon registration and is connected to their email
List of BasketItems: this is comprised of all the products being purchased

- Basket Items Items in a basket will have:

an ID: to identify every item associated with a basket
ProductID: the product ID that is tied to the basket
ProductName: the name of the product tied to the basket
CustomerEmail: the email of the customer buying the product, so we can associate the customer with the product they're buying
Quantity: the number of times of the product they're buying
ImgUrl: the image tied to that product
UnitPrice: how much that product costs

- Order Orders will have:

an ID: identifies each order
UserID: connect each customer to an order
Shipping: the address of each customer
List of OrderItems: ties this order to the item in the order, which is defined in OrderItems
Address ID: ID that connects an address to an order
Address: The address associated with the Address ID
DiscountName: name of the discount because we have 2 tiers
DiscountPercent: percentage of the discount because we have 2 tiers

- OrderItems Order Items are the items on an Order:

an ID: to identiyy each order
OrderID: to identify each item on an order
ProductID: to identify each product on an order
UserID: to connect the user who is buying that product
ProductName: the name of the product being bough
Quantitiy: the number of items being bought
ImgUrl: the picture of the item
UnitPrice: how much that item costs

- Address Addressses will have:

an ID: identifies each address
FirstName: first name of the person this is being shipped to
LastName: last name of the person this is being shipped to
Street: street address of the customer, e.g street name
Street2: street address 2 of the customer, e.g apartment #
City: city that the person, this is being shipped, is living in
State: state that the person, this is being shipped, is living in
Country: country that the person, this is being shipped, is living in
Zip: zipcode that the person, this is being shipped, is living in
UserID: connects this address to a user
---
