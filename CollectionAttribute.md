Festival Bundles Collection
Attributes:

name (string): Name of the bundle
description (string): Description of the bundle
item (array of strings): List of items in the bundle
image (array of strings): URLs of images for the bundle
fest (string): Festival name (e.g., 'diwali', 'holi', 'navratri')
price (number): Price of the bundle
quantity (array of numbers): Quantities of each item in the bundle



Cart Context Collection
Attributes:

phone (string): User's phone number
bundle (array of strings): Names of bundles in the cart
item (array of strings): Names of individual items in the cart
total (number): Total price of items in the cart
quantity (array of numbers): Quantities of each item in the cart
distributorIndex (array of numbers): Indices of the selected distributors



Account Collection
Attributes:

name (string): User's name
mobile (string): User's mobile number
address (array of strings): User's addresses
Festival Pages Collection
Attributes:

id (string): Festival identifier
name (string): Festival name
description (string): Festival description
image (string): URL of the festival image
href (string): URL path for the festival page



Orders Collection
Attributes:

phone (string): User's phone number
bundle (array of strings): Names of bundles in the order
item (array of strings): Names of individual items in the order
total (number): Total price of the order
quantity (array of numbers): Quantities of each item in the order
distributorIndex (array of numbers): Indices of the distributors involved in the order
address (string): Delivery address
status (string): Order status (e.g., 'Processing', 'Shipped', 'Delivered', 'Cancelled')
date (string): Order date
transactionId (string): Transaction identifier



Individual Items Collection
Attributes:

id (string): Item identifier
name (string): Item name
description (string): Item description
tags (array of strings): Item tags
image (array of strings): URLs of item images
rating (number): Item rating
distributor (string): Item distributor
inventory (number): Item inventory count
price (number): Item price



Festival Pages Collection
Attributes:

id (string): Festival identifier
name (string): Festival name
description (string): Festival description
image (string): URL of the festival image