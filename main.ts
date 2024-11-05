document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event?.preventDefault();

    const profilepictureElement = document.getElementById('profilepicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const lastnameElement = document.getElementById('lastname') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const mobilenumberElement = document.getElementById('mobilenumber') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillElement = document.getElementById('skill') as HTMLTextAreaElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;

    if (profilepictureElement && nameElement && lastnameElement && emailElement && mobilenumberElement && addressElement && educationElement && experienceElement && skillElement && usernameElement) {

        const name = nameElement.value;
        const lastname = lastnameElement.value;
        const email = emailElement.value;
        const mobilenumber = mobilenumberElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillElement.value;
        const username = usernameElement.value;
        const uniquePath = `${username.replace(/\s+/g, '')}_cv.html`; 

        // Get profile picture file and generate URL
        const profilepicture = profilepictureElement.files?.[0];
        const profilepictureURL = profilepicture ? URL.createObjectURL(profilepicture) : '';

        // Create the resume output
        const resumeOutput = `
            <h2>Resume Sana</h2>
            ${profilepictureURL ? `<img src="${profilepictureURL}" alt="Profile Picture" class="profilepicture">` : ''}
            <p><strong>Name:</strong> <span id="edit.name" class="editable">${name} ${lastname}</span></p>
            <p><strong>Email:</strong> <span id="edit.email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="edit.mobilenumber" class="editable">${mobilenumber}</span></p>
            <p><strong>Address:</strong> <span id="edit.address" class="editable">${address}</span></p>
            <h3>Education</h3>
            <p id="edit.education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="edit.experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit.skill" class="editable">${skill}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput; 

            // Create the Download button
            const downloadButton = document.createElement('button');
            downloadButton.className = 'downloadButton';
            downloadButton.textContent = 'Download';
            downloadButton.addEventListener('click', () => {
            
                const blob = new Blob([resumeOutput], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = uniquePath; 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

          // Create the Share button
const shareButton = document.createElement('button');
shareButton.className = 'shareButton';
shareButton.textContent = 'Share';
shareButton.addEventListener('click', () => {
    const shareUrl = encodeURIComponent(window.location.href);  
    const shareText = encodeURIComponent("Check out my resume!");

    // Define share URLs
    const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`;
    const whatsappShare = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;

    // Logging the URLs for debugging
    console.log("Facebook URL:", fbShare);
    console.log("LinkedIn URL:", linkedinShare);
    console.log("WhatsApp URL:", whatsappShare);

    // Prompt user to choose a platform
    const platform = prompt("Enter 'fb' for Facebook, 'ln' for LinkedIn, or 'wa' for WhatsApp:");

    // Open the appropriate share URL based on user input
    if (platform === 'fb') {
        window.open(fbShare, '_blank');
    } else if (platform === 'ln') {
        window.open(linkedinShare, '_blank');
    } else if (platform === 'wa') {
        window.open(whatsappShare, '_blank');
    } else if (platform !== null) {
        alert("Please enter a valid option: 'fb', 'ln', or 'wa'.");
    }
});


            resumeOutputElement.appendChild(downloadButton);
            resumeOutputElement.appendChild(shareButton);
        }

        makeEditable(); 
    } else {
        console.error('One or more input elements are missing');
    }

    // Function to make text editable on click
    function makeEditable() {
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach((element) => {
            element.addEventListener('click', function () {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent || '';

                if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentValue;
                    input.classList.add('editing-input'); 

                    input.addEventListener('blur', function () {
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline';
                        input.remove(); 
                    });

                    currentElement.style.display = 'none'; 
                    currentElement.parentNode?.insertBefore(input, currentElement); 
                    input.focus(); 
                }
            });
        });
    }
});
