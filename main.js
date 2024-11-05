var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event === null || event === void 0 ? void 0 : event.preventDefault();
    var profilepictureElement = document.getElementById('profilepicture');
    var nameElement = document.getElementById('name');
    var lastnameElement = document.getElementById('lastname');
    var emailElement = document.getElementById('email');
    var mobilenumberElement = document.getElementById('mobilenumber');
    var addressElement = document.getElementById('address');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillElement = document.getElementById('skill');
    var usernameElement = document.getElementById("username");
    if (profilepictureElement && nameElement && lastnameElement && emailElement && mobilenumberElement && addressElement && educationElement && experienceElement && skillElement && usernameElement) {
        var name_1 = nameElement.value;
        var lastname = lastnameElement.value;
        var email = emailElement.value;
        var mobilenumber = mobilenumberElement.value;
        var address = addressElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skill = skillElement.value;
        var username = usernameElement.value;
        var uniquePath_1 = "".concat(username.replace(/\s+/g, ''), "_cv.html");
        // Get profile picture file and generate URL
        var profilepicture = (_a = profilepictureElement.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilepictureURL = profilepicture ? URL.createObjectURL(profilepicture) : '';
        // Create the resume output
        var resumeOutput_1 = "\n            <h2>Resume Sana</h2>\n            ".concat(profilepictureURL ? "<img src=\"".concat(profilepictureURL, "\" alt=\"Profile Picture\" class=\"profilepicture\">") : '', "\n            <p><strong>Name:</strong> <span id=\"edit.name\" class=\"editable\">").concat(name_1, " ").concat(lastname, "</span></p>\n            <p><strong>Email:</strong> <span id=\"edit.email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span id=\"edit.mobilenumber\" class=\"editable\">").concat(mobilenumber, "</span></p>\n            <p><strong>Address:</strong> <span id=\"edit.address\" class=\"editable\">").concat(address, "</span></p>\n            <h3>Education</h3>\n            <p id=\"edit.education\" class=\"editable\">").concat(education, "</p>\n            <h3>Experience</h3>\n            <p id=\"edit.experience\" class=\"editable\">").concat(experience, "</p>\n            <h3>Skills</h3>\n            <p id=\"edit.skill\" class=\"editable\">").concat(skill, "</p>\n        ");
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput_1;
            // Create the Download button
            var downloadButton = document.createElement('button');
            downloadButton.className = 'downloadButton';
            downloadButton.textContent = 'Download';
            downloadButton.addEventListener('click', function () {
                var blob = new Blob([resumeOutput_1], { type: 'text/html' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = uniquePath_1;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
            // Create the Share button
            var shareButton = document.createElement('button');
            shareButton.className = 'shareButton';
            shareButton.textContent = 'Share';
            shareButton.addEventListener('click', function () {
                var shareUrl = encodeURIComponent(window.location.href);
                var shareText = encodeURIComponent("Check out my resume!");
                // Define share URLs
                var fbShare = "https://www.facebook.com/sharer/sharer.php?u=".concat(shareUrl);
                var linkedinShare = "https://www.linkedin.com/shareArticle?mini=true&url=".concat(shareUrl, "&title=").concat(shareText);
                var whatsappShare = "https://api.whatsapp.com/send?text=".concat(shareText, "%20").concat(shareUrl);
                // Logging the URLs for debugging
                console.log("Facebook URL:", fbShare);
                console.log("LinkedIn URL:", linkedinShare);
                console.log("WhatsApp URL:", whatsappShare);
                // Prompt user to choose a platform
                var platform = prompt("Enter 'fb' for Facebook, 'ln' for LinkedIn, or 'wa' for WhatsApp:");
                // Open the appropriate share URL based on user input
                if (platform === 'fb') {
                    window.open(fbShare, '_blank');
                }
                else if (platform === 'ln') {
                    window.open(linkedinShare, '_blank');
                }
                else if (platform === 'wa') {
                    window.open(whatsappShare, '_blank');
                }
                else if (platform !== null) {
                    alert("Please enter a valid option: 'fb', 'ln', or 'wa'.");
                }
            });
            resumeOutputElement.appendChild(downloadButton);
            resumeOutputElement.appendChild(shareButton);
        }
        makeEditable();
    }
    else {
        console.error('One or more input elements are missing');
    }
    // Function to make text editable on click
    function makeEditable() {
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () {
                var _a;
                var currentElement = element;
                var currentValue = currentElement.textContent || '';
                if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                    var input_1 = document.createElement('input');
                    input_1.type = 'text';
                    input_1.value = currentValue;
                    input_1.classList.add('editing-input');
                    input_1.addEventListener('blur', function () {
                        currentElement.textContent = input_1.value;
                        currentElement.style.display = 'inline';
                        input_1.remove();
                    });
                    currentElement.style.display = 'none';
                    (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                    input_1.focus();
                }
            });
        });
    }
});
