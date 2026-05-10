const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

const submitBtn = document.querySelector('.btn-submit');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      if (response.status == 200) {
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#2d6a4f';
        contactForm.reset();
      } else {
        submitBtn.textContent = 'Error! Try again';
      }
    })
    .catch(error => {
      submitBtn.textContent = 'Something went wrong';
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 5000);
    });
  });
}

const projectData = {
  'CYSWEP': {
    title: "County Youth Service & Women Empowerment Program",
    timeline: "2015 to Date",
    partner: "County Government of Kakamega",
    desc: "It is an initiative of the County Government of Kakamega. SMF has been involved through the process of inception, developing framework, structures and systems and offering advisory on the recruitment and training of the service men and women. The then inception of “Kazi Mashinani” (grass root casual work) Program in 2015 and subsequent roll out in 2016 to 2018 preceded the County Youth Service & Women Empowerment Programme (CYSWEP) able to give employment to 2000 youth and women categories comprising: 720 security guards, 442 market cleaners, and 840 roads maintenance. The programme has seen more than 1000 youth enrolled for training in diverse technical areas offered at the local county polytechnics. The CYSWEP together with its predecessor,” Kazi Mashinani” have been able to engage a combined total of 10,000 underprivileged youth and women thereby contributing towards poverty reduction in society, improving health through improving the local business environment through improved infrastructure maintenance."
  },
  'Mwangaza': {
    title: "Mwangaza African Programme",
    timeline: "2014 - 2017",
    partner: "AIDS & Child Foundation, Zurich",
    desc: "The programme reaches out to the furthest and the interior part of Kenya, Liberia and South Africa providing life changing program to the most affected with poor heath and poverty. AIDS & CHILD is involved in humanitarian program supporting women and children infected and affected by HIV/AIDS and many struggling in poverty. SMF has so far helped to develop and implement sustainable program that improves access to health, education, livelihood and psycho social for the marginalized, under-served and the under privileged in the society. The Consultants have provided long term solutions through the implementing organization to the beneficiary who are AIDS Orphans, widows and family stuck with extreme poverty. The resources are directed towards tackling real issues that affect this children, widows/mother led families and their household."
  },
  'CBBAM': {
    title: "Church Based Business As Mission",
    timeline: "2012 - 2015",
    partner: "ICM – USA/Kenya",
    desc: "Working with partners world wide and dynamic global network of business and professional people who bare witness to their faith and love in Jesus Christ so that rich and poor, individuals and groups, communities and nations are transferred to more completely reflect kingdom of God. SMF engaged and supported grass root network of business people through global partnership and personal relationships that transformed the lives of all involved. The Firm provided a framework for healthy cross-cultural partnership, vibrant networking and shared learning opportunities. The Firm also promoted model and tools for success and sustainability including mentoring, access to capital, advocacy, and training tools including the business curriculum."
  },
  'PALWECO': {
    title: "Program for Agriculture and Livelihoods",
    timeline: "2014 - 2015",
    partner: "PALWECO PSU & Ministry of Labour",
    desc: "This is a multi sectorial rural development program with focus on poverty reduction. The SMF led the process of training CBOs, Youth, Women and minority groups based in the Country’s administrative structure. The broad objective of the training was to create an improved awareness and knowledge on household poverty alleviation strategies and self sustainable activities. The overall objective of the Firm was to increase the capacity of the youth, women groups and People with Disability and Persons Living with HIV/AIDS to participate in poverty alleviation program."
  },
  'NurturingCare': {
    title: "Nurturing Care for Early Childhood Development",
    timeline: "2023 to Date",
    partner: "Lake Region Economic Bloc (LREB)",
    desc: "The LREB is implementing a County led Nurturing Care for ECD Model. The goal is to ensure that children not only survive but thrive and develop to their full potential putting an emphasis on the first one thousand days of life under the good care of their guardians. At the County level, the initiative is driven by a Multi sectorial coordination structure (MST). SMF has been involved since inception of this program. So far the company has helped train the MST members on the science of scaling up Nurturing Care for Early Childhood Development through emphasizing on optimizing energies to identify and scale up best practices of Nurturing Care for Early Childhood Development by their care givers who are mostly women, to conduct advocacy on: Reproductive maternal, newborn, child and adolescent health (RMNCAH) & Nurturing Care in nutrition through developed manuals, spearhead Baseline Survey on Nurturing Care for Early Childhood Development through development of data collection too (Kobo Toolbox), trained the Research Assistants on the tool and developed comprehensive report of the Survey."
  },
  'GLS': {
    title: "The Global Leadership Summit (GLS)",
    timeline: "Ongoing",
    partner: "Global Leadership Network / SMF Ltd",
    desc: "Empowering leaders through world-class training and strategic development. SMF acts as a lead strategist for implementing efficiency and sustainable growth models."
  }
};

function openProjectModal(key) {
  const data = projectData[key];
  if (data) {
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalTimeline').innerText = data.timeline;
    document.getElementById('modalPartner').innerText = data.partner;
    document.getElementById('modalDescription').innerText = data.desc;
    const modal = document.getElementById('projectModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    console.error("Project data not found for key: " + key);
  }
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
  let modal = document.getElementById('projectModal');
  if (event.target == modal) { closeProjectModal(); }
}

window.onkeydown = function(event) {
  if (event.key === "Escape") { closeProjectModal(); }
}