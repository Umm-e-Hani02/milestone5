"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.getElementById('resume-form');
    const resumeOutputElement = document.getElementById('resume-output');
    const shareableLinkContainer = document.getElementById('shareable-link-container');
    const downloadPdfButton = document.getElementById('download-pdf');
    const shareableLinkElement = document.getElementById('shareable-link');
    if (formElement) {
        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
            const nameElement = document.getElementById("name");
            const emailElement = document.getElementById("email");
            const degreeElement = document.getElementById("degree");
            const institutionElement = document.getElementById("institution");
            const graduationYearElement = document.getElementById("graduationYear");
            const skillsElement = document.getElementById("skills");
            const workExperienceElement = document.getElementById("workExperience");
            if (nameElement && emailElement && degreeElement && institutionElement && graduationYearElement && skillsElement && workExperienceElement) {
                const name = nameElement.value;
                const email = emailElement.value;
                const degree = degreeElement.value;
                const institution = institutionElement.value;
                const graduationYear = graduationYearElement.value;
                const skills = skillsElement.value;
                const workExperience = workExperienceElement.value;
                const resumeOutput = `
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>

                    <h2>Education</h2>
                    <p><strong>Degree:</strong> ${degree}</p>
                    <p><strong>Institution:</strong> ${institution}</p>
                    <p><strong>Graduation Year:</strong> ${graduationYear}</p>

                    <h2>Skills</h2>
                    <p><strong>Skills:</strong> ${skills}</p>

                    <h2>Work Experience</h2>
                    <p><strong>Work Experience:</strong> ${workExperience}</p>`;
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    resumeOutputElement.style.display = 'block';
                }
                if (shareableLinkContainer) {
                    shareableLinkContainer.style.display = 'block';
                    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(name)}`;
                    console.log("Generated Shareable URL:", shareableURL);
                    if (shareableLinkElement) {
                        shareableLinkElement.href = shareableURL;
                        shareableLinkElement.textContent = shareableURL;
                    }
                }
                if (downloadPdfButton) {
                    downloadPdfButton.addEventListener('click', () => {
                        if (formElement)
                            formElement.style.display = 'none';
                        if (shareableLinkContainer)
                            shareableLinkContainer.style.display = 'none';
                        const printWindow = window.open('', '', 'height=800,width=600');
                        if (printWindow) {
                            printWindow.document.open();
                            printWindow.document.write(`
                                <html>
                                <head>
                                    <title>Print Resume</title>
                                    <style>
                                        body { font-family: Arial, sans-serif; margin: 20px; }
                                        h2 { margin-top: 20px; }
                                    </style>
                                </head>
                                <body>
                                    ${resumeOutput}
                                </body>
                                </html>
                            `);
                            printWindow.document.close();
                            printWindow.focus();
                            printWindow.print();
                            setTimeout(() => {
                                if (formElement)
                                    formElement.style.display = 'block';
                                if (shareableLinkContainer)
                                    shareableLinkContainer.style.display = 'block';
                            }, 1000);
                        }
                    });
                }
            }
            else {
                console.error("One or more form elements are missing");
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('degree').value = resumeData.degree;
            document.getElementById('institution').value = resumeData.institution;
            document.getElementById('graduationYear').value = resumeData.graduationYear;
            document.getElementById('skills').value = resumeData.skills;
            document.getElementById('workExperience').value = resumeData.workExperience;
            document.getElementById("resume-form").dispatchEvent(new Event('submit'));
        }
    }
});
