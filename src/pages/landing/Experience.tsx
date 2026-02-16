import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from 'react'
import InteractiveText from "@/components/InteractiveText"

const experiences = [
  {
    title: 'Software Engineer (Trainee)',
    company: 'JPMORGAN CHASE & CO.',
    location: 'India',
    period: 'Nov 2024 - Nov 2024',
    description: 'Developed and tested REST APIs using Spring Boot, implemented event-driven architecture with Kafka, and worked with H2 database and JPA.',
    achievements: [
      'Completed project setup and Kafka integration',
      'Developed REST APIs using Spring Boot',
      'Implemented event-driven architecture'
    ]
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Ecosync Nexus',
    location: 'Lucknow',
    period: 'Oct 2025 - Oct 2025',
    description: 'Architected end-to-end ML pipeline for IoT energy management system. Engineered predictive energy models using XGBoost and PyTorch.',
    achievements: [
      'Architected end-to-end ML pipeline',
      'Optimized models for low-latency inference on edge devices',
      'Integrated predictive models with Android and Web clients'
    ]
  },
  {
    title: 'Freelance Machine Learning Engineer & Full Stack',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'Sep 2024 - Present',
    description: 'Engineered custom ML models for enterprise clients and designed scalable REST APIs to serve models to web and mobile clients.',
    achievements: [
      'Custom ML models for business workflows',
      'Scalable REST APIs for model serving',
      'Frontend-backend integration'
    ]
  },
  {
    title: 'AWS Solutions Architecture (Trainee)',
    company: 'AWS APAC Program',
    location: 'Remote',
    period: 'Oct 2024 - Nov 2024',
    description: 'Completed AWS cloud architecture training focused on scalable solutions involved EC2, S3, Lambda, and VPC services.',
    achievements: [
      'Hands-on experience with AWS services',
      'Designed demo AWS environments',
      'Cloud-native application design'
    ]
  },
  {
    title: 'GSSOC Contributor',
    company: 'Open Source',
    location: 'Remote',
    period: 'Aug 2025 - Present',
    description: 'Contributed to the official SciPy library by rectifying mathematical inconsistencies in documentation.',
    achievements: [
      'Contributed to SciPy library',
      'Fixed mathematical inconsistencies in documentation',
      'PR #18214 merged'
    ]
  }
]

const education = [
  {
    degree: 'Pursuing BTech CSE(AI)',
    school: 'Babu Banarasi Das University',
    location: 'Lucknow, India',
    period: '2024-2028',
    gpa: '9.41'
  }
]

const certificationsData = [
  {
    name: '1st Winner of Kalpathon 2025',
    issuer: 'Babu Banarasi Das (BBD) University',
    date: '2025',
    description: 'We have secured 1st🥇 position in 𝗞𝗮𝗹𝗽𝗮𝘁𝗵𝗼𝗻 2025 🖥️ at the International Conference on AI and Digital Growth – Akhil Jyot, hosted by Babu Banarasi Das University and IEEE 🌟',
    skills: []
  },
  {
    name: 'Winners of "AI and robotics for disaster management"',
    issuer: 'Washington University of Science and Technology',
    date: '2024',
    description: 'My team and I won the Thematic Award for AI and Robotics in Disaster Management in the Washington Hackathon organised by Washington University of Science and Technology.',
    skills: []
  },
  {
    name: 'Gen AI Academy Completion #1 learner over India',
    issuer: 'Google Cloud',
    date: '2024',
    description: 'Feeling incredibly proud and excited! 🤩 Just received some amazing swag from Google for being the #1 Performer of the Gen AI Academy! 🏆 This is such a proud moment, a true testament that all the hard work and determination really does pay off. 🙏',
    skills: []
  },
  {
    name: 'Finalist in the Integration for AI/GenAI Hackathon',
    issuer: 'Informatica',
    date: '2024',
    description: 'We got selected in the world wide hackathon organised by Informatica for GenAI.',
    skills: []
  },
  {
    name: 'Ideathon 2025 Finalist',
    issuer: 'Soft Computing Research Society USA Center at Florida International University',
    date: '2025',
    description: 'In the Ideathon 2025 which is organised by Soft Computing Research Society USA center at Florida International University🎓, we were selected for the final presentation.',
    skills: []
  },
  {
    name: 'Certified Software Engineer',
    issuer: 'Certification Body',
    date: '2025',
    description: 'Certified Software Engineer credential demonstrating proficiency in software engineering principles and practices.',
    skills: []
  },
  {
    name: 'Certified Machine Learning Engineer',
    issuer: 'Certification Body',
    date: '2025',
    description: 'Certified Machine Learning Engineer credential validating expertise in designing and deploying machine learning models.',
    skills: []
  }
]

const Experience = () => {
  const [openCert, setOpenCert] = useState<string | null>(null);

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <InteractiveText text="Experience" />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <InteractiveText text="My professional journey and educational background" />
          </p>
        </motion.div>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-purple-400" />
            <InteractiveText text="Work Experience" />
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2"><InteractiveText text={exp.title} /></h4>
                    <p className="text-purple-400 font-medium mb-2"><InteractiveText text={exp.company} /></p>
                    <p className="text-gray-400 flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <InteractiveText text={exp.location} />
                    </p>
                  </div>
                  <span className="text-gray-300 bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                    <InteractiveText text={exp.period} />
                  </span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed"><InteractiveText text={exp.description} /></p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-400 flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      <InteractiveText text={achievement} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Award className="w-6 h-6 mr-3 text-purple-400" />
            <InteractiveText text="Education" />
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <h4 className="text-xl font-semibold text-white mb-2"><InteractiveText text={edu.degree} /></h4>
                <p className="text-purple-400 font-medium mb-2"><InteractiveText text={edu.school} /></p>
                <p className="text-gray-400 flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <InteractiveText text={edu.location} />
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm"><InteractiveText text={edu.period} /></span>
                  <span className="text-gray-300 bg-purple-500/20 px-2 py-1 rounded text-sm">
                    <InteractiveText text={`SGPA: ${edu.gpa}`} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            <InteractiveText text="Certifications" />
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationsData.map((cert, index) => (
              <div
                key={cert.name}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/10 transition-colors duration-300"
              >
                <Collapsible
                  open={openCert === cert.name}
                  onOpenChange={() => setOpenCert(openCert === cert.name ? null : cert.name)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        <InteractiveText text={cert.name} />
                      </h4>
                      <p className="text-purple-400 text-sm"><InteractiveText text={cert.issuer} /> • {cert.date}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openCert === cert.name ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                    <div className="flex justify-center mt-4">
                      <a
                        href="https://www.linkedin.com/in/param-singh-744a97269/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                      >
                        View on LinkedIn
                      </a>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
