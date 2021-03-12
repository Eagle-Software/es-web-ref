# Eagle Medical Website Outline
Outline of pages and functionality to be implemented

*This document is not an indication of what has or has not been implemented.*

> Meta: Items in **bold** are content that we need obtained.

> Meta: Anything shown in `this format` is a *static character string or property* and if changed, needs to be changed within the code (e.x. a page title, a page's address, a variable name (e.x. `userType`) or a variable name's displayed string (e.x. `User Type`) )

> Meta: Anything <span style="color:red" >displayed in red</span> is a *redline* and therefore a suggestion for future edits. *Redline*s need to be inquired about for acceptance and subsequent marking for implementation.

## Components
* Header (`components/header`) (shown at top of every page and *sticky*)
  * `Home` link to Home Page (`/`)
  * `Services` dropdown menu for available services
    * <span style="color:red">Seperate `Services` button and dropdown arrow so that the button links to the `Services` (`/services`) page and the dropdown shows the menu of available services?</span>
    * Lists links to available services under `Services` (`/services`) page
* Footer (`components/footer`) (shown at bottom of every page)
    * `Company:`
      * `About Us` link
      * `Careers` link
      * `Architecture` link (meta page showing information regarding website development)
    * `Services:`
      * Lists links to available services under `Services` (`/services`) page
    * `Contact Us:`
      * `<mail icon>` `info@eaglemed.com`
      * `<location icon>` `2921 Union Rd, Paso Robles, CA 93466`
      * `<phone icon>` `(805) 238-7401`
      * `<fax icon>` `(805) 238-6541`
* `Contact Us` Form (`components/contact.form`)
  * `We'd love to hear from you!` header
  * `Your name` field
    * hint: `Christopher Walken`
  * `Email address` field
    * hint: `cwalken@example.com`
  * `Company name` field
    * hint: `Eagle Medical`
  * `message` field (text-area)
    * hint: `How can we help you today?`

## Structure
* Home Page (`/`)
  * Carousel showing the following headings:
    * `Quality Assembly and Packaging`
      * Description: `Eagle Medical is certified to requirements of ISO 13485:2016 for contract packaging and sterilization of medical products.`
        * <span style="color:red">Add link to `ISO 13485:2016` to go to **our certification** or the ISO's webpage on the standard?</span>
      * Image: `public/carousel/01.jpg` (shrinkwrap machine)
    * `Sterilization Solutions`
      * Description: `Eagle Medical is committed to finding the most suitable and efficient sterilization method for our customers' products.`
      * Image: `public/carousel/02.jpg` (sterilizers)
    * `Cleanrooms` 
      * Description: `ISO 14644-1 Class 7 (Class 10,000) state of the art cleanrooms and laminar flow benches provide the highest standard of sterile environment for your procedures.`
        * <span style="color:red">Add link to `ISO 14644-1:2016` to go to **our certification** or the ISO's webpage on the standard?</span>
      * Image: `public/carousel/03.jpg` (cleanroom)
    * <span style="color:red">Add links to each heading to go to their respective pages...?</span>
* `Services` (`/services`)
  * <span style="color:red">This page does not currently have anything linking to this page though we should probably **add content that explains each service** and then link to each service page</span>
  * `Medical Device Sterilization` (`/services/sterilization`)
  * `Production and Packaging` (`/services/production`)
  * `Product Development and FDA Approval` (`/services/development`)
  * <span style="color:red">**Add services or at least break them down in a better way? I think this part of the outline could use some restructuring.** I'm not too clear on all the services we offer and how they can be structured into categories and subcategories.</span>
* `About Us` (`/about`)
  * `ABOUT US` heading
    * `<About Us text>`
    * <span style="color:red">Add a nice **group picture** of all the employees?</span>
  * `THE MANAGEMENT TEAM` heading
    * list each of the managers and their bio
    * <span style="color:red">Add a nice **picture for each manager** to go next to their name? Adds a nice personal touch.</span>
* `Contact Us` (`/contact`)
  * Picture of the office's entrance (`public/location.png`)
    * Caption: `We are located in beautiful Paso Robles, off of Hwy. 46, near Hwy. 101.`
  * `Paso Robles, CA Offices` heading
    * contact information that is pulled from the Footer component
  * `Contact Us` Form (`components/contact.form` (see components section above for structure) )
* `Careers` (`/careers`)
  * Link to the `Application for Employment (Hourly)` (`/forms/application`) page for hourly applicants
  * List of available positions, their minimum requirements and how to apply for them
    * **Need a list of these positions or at least an example of the information for each position that needs to be displayed**
* `Login` (`/login`) - login page for all users
  * Successful login requires the `Email` and `Password` that the user registered with
* `Register` (`/register`) - user registration page
  * Successful registration requires:
    * `Email`  <span style="color:red">add a verification code email after successful registration?</span>
    * `Password`
    * `Password Confirmation` that matches the `Password` field
    * `User Type` is selected from a dropdown menu and is one of the following:
      * <span style="color:red">`none` (default) for those who wish to sign up for a newsletter...or what else would we need a `none` default user type for?</span>
      * `Applicant` - a user that is filling out and saving a job application
      * `Employee` - an employee of Eagle Medical
        * Requires an `Employee ID#`, `First Name` and `Last Name` that matches the employee records that we have on file (and have imported into the `em-db`)
          * <span style="color:red">It may be a good idea to make this more secure such as verifying the employee's last 4 digits of their SSN# with their first and last name as opposed to their employee ID# which can be more easily obtained.</span>
      * `Customer` - a customer of Eagle Medical
        * Successful registration requires a `Customer Code` which is given to the company by Eagle Medical and allows the company's employees to register with this site using their own private credentials. This `Customer Code` is then stored as a property of the user to designate the pages and data the user has access to.
* `Forms` (`/forms`)
  * To have access to this page, the user must be of the correct 'kind' <span style="color:red">(not sure what 'kind' or other property the user should have to have access to this page just yet)</span>
  * Shows all available forms that this user has access to in tree form
  * `Build Form` (`/forms/build`)
    * Page to build a new form
  * View form (`/forms/:id`)
    * `:id` maps to the `formID` property for each form that has been created in the database
    * User must be logged in and have access to this form in order to fill it out.
* `Meta` (`/meta`)
  * 
