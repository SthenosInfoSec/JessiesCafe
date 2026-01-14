# Jessie's Café & Pizza – Comprehensive Website Generation and Deployment Prompt

## 1. Research‑based description of Jessie's Café & Pizza

- **Location and contact** – Jessie's Café & Pizza is located at **3a Atholl Road, Pitlochry PH16 5BX, Scotland**【521269478056408†L115-L164】.  The café is dog‑friendly and offers street parking【521269478056408†L115-L164】.
- **Menu and cuisine** – The café is known for **homemade pancakes, pizza, soup, sandwiches and tray‑bakes**【521269478056408†L175-L200】【521269478056408†L403-L432】.  Its cuisine is classified as *pizza, café and British*, and the menu covers **breakfast, lunch, dinner, brunch and drinks**【521269478056408†L115-L124】.  Jessie's offers **vegetarian‑friendly, vegan and gluten‑free options**【521269478056408†L115-L125】.
- **Features** – Features highlighted by travellers include acceptance of credit cards, digital payments, American Express, Visa and Mastercard; dog‑friendly seating; free Wi‑Fi; outdoor seating; high chairs; take‑out service; wheelchair access; and wine & beer availability【521269478056408†L127-L159】.
- **Operating hours** – According to recent listing information, typical hours are **Sunday 09:30–16:00**, **Monday 10:00–15:00**, **Tuesday Closed**, **Wednesday Closed**, **Thursday 10:00–15:00**, **Friday 09:30–16:00 & 17:00–20:00 (pizza night)** and **Saturday 09:30–16:00**【521269478056408†L215-L247】.  Posts on social media show that the café occasionally closes for holidays or operates special hours (e.g., **Christmas Eve pizza from 4–8 pm** and **Friday evening pizza from 4:30–8 pm**)—be sure the website’s admin panel allows dynamic control over hours and event announcements.
- **Ambience and reputation** – Traveller reviews describe Jessie's Café as **cosy, relaxed and friendly**, with reasonable prices and generous portions【521269478056408†L307-L314】.  The café is often praised for its service, atmosphere and value【521269478056408†L283-L299】.  It serves *all‑day breakfast*, lunch, coffee and cakes and hosts *pizza nights on Fridays* (customers can message to pre‑order).  The business has won **“Best Café, Perthshire 2024 & 2025”** awards, according to its social‑media bio.
- **Tagline** – An external shopping guide describes Jessie's as “a **warm and welcoming hub for breakfast, lunch, coffee and sweet treats**” where “pizzas are packed with delicious toppings” and there is a menu ranging from **warming bowls of soup to mouth‑watering pancakes**【517492003904022†L67-L71】.

## 2. Theme and design inspiration

Jessie’s uses a **light, natural aesthetic**.  The café’s logo features simple daisy line‑art and muted beige/cream background【427971475†screenshot】.  Social‑media posts show:

- **Latte art and handmade ceramics** with soft grey backgrounds【500523317†screenshot】.
- **Rustic pizza promotions**—overlaid text on warm, blurred backgrounds using light tan fonts and rounded corners【526782534†screenshot】.
- **Stacked pancakes** with warm golden colours【610633606†screenshot】 and **pancake‑themed opening hours** posts【525279087†screenshot】.
- **Winter drinks menu** featuring beige paper with dark red/brown illustrations and simple coffee‑pot icons【602832873†screenshot】.
- **Minimalist line illustrations** for event posters (e.g., Christmas‑Eve pizza) with monochrome drawings【604038359†screenshot】.
- **Café exterior** showing a white building with large windows and subtle signage【609851835†screenshot】.

The website should therefore **avoid dark backgrounds** and instead adopt **light, earthy tones (cream, sand, light grey)**, complemented by **darker olive or brown accents**.  The design should evoke **coziness and cleanliness**, using **rounded corners, soft drop shadows and plenty of white space**.  Incorporate **daisy motifs and simple line drawings** reminiscent of the logo and event posters.  Use high‑resolution photography (coffee, pancakes, pizza, interior/exterior shots) for hero sections and galleries.  Fonts should combine a **modern sans‑serif** for body text with a **playful serif or hand‑drawn style** for headings, similar to the fonts in the opening‑hours posts【526782534†screenshot】.  Consider lightly textured backgrounds or subtle paper grain to match printed menus.【602832873†screenshot】

## 3. High‑level website requirements

1. **Content structure**

   - **Home page** – A welcoming landing page that introduces Jessie's Café & Pizza, highlights its awards and signature dishes (pancakes, pizzas, soups) and encourages visitors to explore the menu.  Include a prominent call‑to‑action for booking or pre‑ordering pizza nights.  Feature high‑quality hero images reflecting the café’s atmosphere.
   - **Menu pages** – Separate sections for **All‑Day Breakfast**, **Lunch**, **Coffee & Cakes**, and **Pizza**.  Each menu item should have a description, price and dietary tags (vegetarian, vegan, gluten‑free).  Provide photographs where available.
   - **Specials & Events** – A section to announce seasonal drinks (e.g., winter drinks menu), special events (e.g., Christmas‑Eve pizza, Friday pizza nights) and changes in opening hours.  This section should be easily editable from the admin panel.
   - **About & Awards** – Tell the story of Jessie's Café, emphasising its warm atmosphere, dog‑friendly policy and Best Café awards (Perthshire 2024 & 2025).  Include testimonials and summarised reviews from travellers.  Provide accessibility information (e.g., wheelchair access, highchairs) and emphasise vegetarian/vegan/gluten‑free options【521269478056408†L115-L125】.
   - **Gallery** – Display curated images of food, interior/exterior, events and latte art.  Users should be able to open images in a lightbox.  Include alt‑text for accessibility.
   - **Contact & Location** – Provide address (3a Atholl Road, Pitlochry), an embedded map, telephone number/email and links to social‑media profiles.  Show current opening hours (pulled from the database) and allow reservations or pre‑orders via a form.
   - **Admin panel** – A secure back‑office interface (similar to Room Rumours Coffee) enabling staff to update menu items, photos, specials, event dates/hours and manage user enquiries.  Use role‑based access control; integrate with AWS Cognito for authentication.

2. **Design requirements**

   - Base the design on the existing **Room Rumours Coffee** project (available in `/Users/lex/Documents/Personal/sthenos/repositories/RoomRumoursCoffee`).  The AI should examine that repository to understand its component structure, admin panel implementation and styling.  Replicate the **overall layout and CMS functionality**, but use a **lighter colour palette**.  Replace dark backgrounds with **cream/beige (#F5F0E6) or light grey (#F1F1F1)**; use **olive‑green (#4F5D4E)** or **warm brown (#8A6652)** for accents.  Integrate the **Jessie's logo** and **daisy motifs** throughout the interface.
   - Implement **mobile‑first responsive design**, ensuring pages look good on phones, tablets and desktops.  Use **accessible font sizes and high‑contrast text**.  Provide alternative text for all images.
   - Include **micro‑animations** (e.g., gentle image fade‑ins, button hover effects) that align with the café’s calm atmosphere.  Keep animations subtle to avoid distraction.
   - Use the **same modern tech stack** as Room Rumours Coffee (likely Next.js with a headless CMS or file‑based content).  If the existing site uses a CMS like Sanity or Contentful, replicate that integration; otherwise, create a simple admin interface with authentication and CRUD operations.

3. **Functionality requirements**

   - **Admin authentication** – Use AWS Cognito with a user pool for admin users.  Only authorised staff can access the admin panel.  Provide a login page with password reset functionality.
   - **Data storage** – Use AWS DynamoDB to store menu items, specials, events, opening hours and contact submissions.  Structure tables with sensible keys (e.g., `MenuType` partition key, `ItemID` sort key).  The admin interface should read/write to DynamoDB via API endpoints.
   - **API layer** – Use AWS Lambda functions (exposed via API Gateway) to implement CRUD operations for menu items, events and contact forms.  Functions should validate input and enforce authorisation via Cognito.  Optionally use AWS AppSync (GraphQL) if the Room Rumours site uses GraphQL.
   - **Static content hosting** – Deploy the front‑end to an S3 bucket configured for static website hosting.  Use AWS CloudFront as a CDN in front of S3 to improve performance and provide HTTPS.  Configure CloudFront caching policies for static assets and dynamic API calls.
   - **Images** – Store uploaded images in a dedicated **S3 bucket**.  Use AWS Lambda@Edge or CloudFront functions to optimise images on the fly if needed.  Restrict public write access; only the admin panel should upload images via signed URLs.
   - **IAM roles & security** – Create IAM roles with least privilege:

     1. **Website deployment role** with permission to upload to the S3 web bucket.
     2. **Lambda execution role** allowing access to DynamoDB, Cognito, S3 (for reading/writing images) and CloudWatch logs.
     3. **Cognito role** for authenticated admin users with permissions to call Lambda/API Gateway endpoints.
     4. **Read‑only role** for unauthenticated users if the site exposes any protected API calls.

   - **Logging and monitoring** – Enable **CloudWatch** logging for all Lambda functions.  Configure **CloudFront access logs** stored in a separate S3 bucket.  Set up **AWS Config** or **AWS CloudTrail** to monitor configuration changes.

## 4. Steps to generate the website

1. **Analyse the existing Room Rumours Coffee project**

   - Clone or open the directory `/Users/lex/Documents/Personal/sthenos/repositories/RoomRumoursCoffee`.  Inspect its `README`, architecture, component structure (e.g., pages, components, styles, admin panel) and deployment scripts.
   - Identify which frameworks and libraries it uses (e.g., Next.js/React, Tailwind CSS, Prisma, GraphQL).  Determine how the admin panel communicates with the backend (REST/GraphQL) and how authentication is implemented.
   - Take note of UI patterns, page transitions, and how the site handles content updates.  Plan to replicate similar patterns while adjusting colours and branding for Jessie's Café.

2. **Set up a new local project**

   ```bash
   # create project directory alongside Room Rumours
   cd /Users/lex/Documents/Personal/sthenos/repositories
   mkdir JessiesCafe
   cd JessiesCafe

   # initialise a git repository
   git init

   # optionally scaffold with the same framework used by Room Rumours
   # e.g., using Next.js with TypeScript
   npx create-next-app@latest . --typescript

   # copy over reusable components or configurations from Room RumoursCoffee
   # adjust theme variables to use lighter colours and Jessie's branding
   ```

3. **Implement the front‑end**

   - Create pages for Home, Menu, Specials/Events, About & Awards, Gallery, Contact and Admin.  Use the routing conventions of the chosen framework.
   - Build reusable components (e.g., header/navigation bar, footer with social links, hero banner, card components for menu items).  Use CSS variables or a theme file to define colours and fonts matching Jessie's branding.
   - Integrate a rich‑text editor (if needed) in the admin panel for formatting specials or announcements.
   - Implement forms (contact form, pre‑order pizza request) that submit data to the backend via API endpoints.

4. **Set up AWS backend via CLI**

   Make sure your environment variables are configured: `AWS_REGION=eu-west-2` and `AWS_PROFILE=mvp`.

   1. **Create S3 buckets**

      ```bash
      # bucket for website
      aws s3 mb s3://jessiescafe-website --region $AWS_REGION
      aws s3 website s3://jessiescafe-website --index-document index.html --error-document 404.html

      # bucket for images
      aws s3 mb s3://jessiescafe-images --region $AWS_REGION

      # bucket for logs
      aws s3 mb s3://jessiescafe-logs --region $AWS_REGION
      ```

   2. **Create DynamoDB tables**

      ```bash
      aws dynamodb create-table \
        --table-name JessiesMenu \
        --attribute-definitions AttributeName=MenuType,AttributeType=S AttributeName=ItemID,AttributeType=S \
        --key-schema AttributeName=MenuType,KeyType=HASH AttributeName=ItemID,KeyType=RANGE \
        --billing-mode PAY_PER_REQUEST --region $AWS_REGION

      aws dynamodb create-table \
        --table-name JessiesEvents \
        --attribute-definitions AttributeName=EventID,AttributeType=S \
        --key-schema AttributeName=EventID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST --region $AWS_REGION
      ```

   3. **Create Cognito user pool**

      ```bash
      aws cognito-idp create-user-pool --pool-name JessiesCafeAdmins --region $AWS_REGION
      # Note: record the UserPoolId from the response.  Then create an app client.
      aws cognito-idp create-user-pool-client \
        --user-pool-id <UserPoolId> --client-name JessiesAdminApp --no-generate-secret --region $AWS_REGION
      ```

   4. **Create IAM roles and attach policies**

      - **Lambda execution role** (e.g., `JessiesLambdaRole`) with policies: `AWSLambdaBasicExecutionRole`, `AmazonDynamoDBFullAccess` (scope down to specific tables), `AmazonS3ReadOnlyAccess` for images and `AWSAppSyncInvokeFullAccess` or API Gateway invoke rights.
      - **Admin authenticated role** for Cognito identity pool, granting permission to call API Gateway methods.
      - **Deployment role** with permission to put objects to `jessiescafe-website` bucket.

      Use `aws iam create-role` and `aws iam attach-role-policy` commands to create these roles.

   5. **Deploy Lambda functions and API Gateway**

      - Write Lambda functions (Node.js or Python) in a `lambda` folder of your project.  Functions should implement CRUD operations for menu items and events and handle contact form submissions.  Include environment variables referencing DynamoDB table names and S3 bucket names.
      - Package each function (zip file) and deploy using `aws lambda create-function` with the appropriate handler, runtime and role.  Example:

        ```bash
        zip function.zip index.js node_modules/*
        aws lambda create-function \
          --function-name createMenuItem \
          --runtime nodejs18.x \
          --zip-file fileb://function.zip \
          --handler index.handler \
          --role arn:aws:iam::<AccountId>:role/JessiesLambdaRole \
          --region $AWS_REGION
        ```

      - Create an API Gateway REST or HTTP API.  Define routes (e.g., `/menu`, `/menu/{id}`, `/events`, `/contact`) and integrate them with the Lambda functions.  Use `aws apigatewayv2 create-api`, `create-route` and `create-integration` commands.

   6. **Create CloudFront distribution**

      ```bash
      aws cloudfront create-distribution \
        --origin-domain-name jessiescafe-website.s3.amazonaws.com \
        --default-root-object index.html \
        --logging-config Enabled=true,IncludeCookies=false,Bucket=jessiescafe-logs.s3.amazonaws.com,Prefix=cf/ \
        --comment "Jessie's Cafe website distribution"
      ```

      Update DNS (via Route 53 if applicable) to point your domain (e.g., `jessiescafe.co.uk`) to the CloudFront distribution.

5. **Testing and deployment**

   - Locally test front‑end pages, API functions and admin panel.  Use Jest or other testing frameworks to write unit/integration tests.
   - Commit your code regularly.  Example Git workflow:

     ```bash
     git add .
     git commit -m "Initial commit – scaffolding Jessie's Café website"
     git push --set-upstream origin main
     ```

   - After building the production version (e.g., `npm run build` for Next.js), synchronise the compiled files to the S3 bucket:

     ```bash
     aws s3 sync ./out s3://jessiescafe-website --delete --region $AWS_REGION
     ```

   - Invalidate CloudFront cache when deploying new versions:

     ```bash
     aws cloudfront create-invalidation --distribution-id <DistributionId> --paths "/*" --region $AWS_REGION
     ```

## 5. Creating the GitHub repository in the SthenosInfoSec organisation

1. Ensure that your local Git configuration is authenticated to GitHub and that you have permission to create repositories under the **SthenosInfoSec** organisation.
2. Use the GitHub CLI or standard git commands to create and push the repository:

   ```bash
   # from within /Users/lex/Documents/Personal/sthenos/repositories/JessiesCafe
   # create a new remote repository under SthenosInfoSec (public or private as desired)
   gh repo create SthenosInfoSec/JessiesCafe --public --description "Jessie's Café & Pizza website" --confirm

   # add all files, commit and push
   git add .
   git commit -m "Initial commit for Jessie's Café website"
   git branch -M main
   git push -u origin main
   ```

3. Configure branch protection rules and repository settings as needed (e.g., require pull‑request reviews for future changes).

## 6. Summary and final recommendations

- The goal is to build a **modern, light‑themed website** for Jessie's Café & Pizza that reflects its cosy atmosphere and award‑winning reputation.  The site should maintain the **structural and functional patterns** of the existing Room Rumours Coffee project but adopt **light earthy colours** and **daisy‑inspired graphics**.
- Use AWS services (S3, CloudFront, DynamoDB, Lambda, Cognito) to create a **scalable, secure serverless backend**.  All infrastructure should be provisioned in the **`eu‑west‑2` region** using the authenticated **`mvp` profile**.  Assign **least‑privilege IAM roles** and enable logging.
- A **GitHub repository** named **JessiesCafe** should be created under the **SthenosInfoSec** organisation and populated with the new project.  Use local git commands and GitHub CLI for repository creation and pushing code.
- The project should include an **admin panel** with Cognito‑secured login, enabling staff to manage menu items, specials, events and opening hours.  The front‑end should provide a polished, responsive experience with accessible design.

