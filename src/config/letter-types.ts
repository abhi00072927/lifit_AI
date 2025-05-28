import type { LetterTypeConfigurations } from '@/lib/types';
import { School, Briefcase, FileText, ClipboardList } from 'lucide-react';
import { z } from 'zod';

export const letterTypeConfigurations: LetterTypeConfigurations = {
  'College/School': {
    label: 'College/School',
    icon: School,
    description: 'Generate letters for academic purposes, like recommendations or applications.',
    formFields: [
      { name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'e.g., Dr. Jane Doe, Admissions Committee', validation: z.string().min(1, 'Recipient name is required.') },
      { name: 'recipientTitle', label: 'Recipient Title/Position', type: 'text', placeholder: 'e.g., Professor, Admissions Officer', validation: z.string().min(1, 'Recipient title is required.') },
      { name: 'institutionName', label: 'Institution Name', type: 'text', placeholder: 'e.g., Harvard University, Springfield High', validation: z.string().min(1, 'Institution name is required.') },
      { name: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Your full name', validation: z.string().min(1, 'Your name is required.') },
      { name: 'yourGradeOrYear', label: 'Your Grade/Year/Program', type: 'text', placeholder: 'e.g., 12th Grade, Senior Year, PhD Candidate', validation: z.string().optional() },
      { name: 'purposeOfLetter', label: 'Purpose of Letter', type: 'textarea', placeholder: 'e.g., Request for recommendation, Application inquiry, Leave request', validation: z.string().min(10, 'Purpose must be at least 10 characters.') },
      { name: 'specificPoints', label: 'Specific Points to Include (optional)', type: 'textarea', placeholder: 'Any specific details or achievements to mention', validation: z.string().optional(), colSpan: 2 },
    ],
  },
  'Job': {
    label: 'Job Application',
    icon: Briefcase,
    description: 'Craft cover letters or other job-related correspondence.',
    formFields: [
      { name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: "e.g., Mr. John Smith or 'Hiring Team'", validation: z.string().min(1, 'Recipient name is required.') },
      { name: 'hiringManagerTitle', label: 'Hiring Manager Title (if known)', type: 'text', placeholder: 'e.g., Senior Recruiter, Head of Department', validation: z.string().optional() },
      { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'e.g., Google, Acme Corp', validation: z.string().min(1, 'Company name is required.') },
      { name: 'jobTitleAppliedFor', label: "Job Title You're Applying For", type: 'text', placeholder: 'e.g., Software Engineer, Marketing Manager', validation: z.string().min(1, 'Job title is required.') },
      { name: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Your full name', validation: z.string().min(1, 'Your name is required.') },
      { name: 'letterTypeDetail', label: 'Type of Job Letter', type: 'select', options: ['Cover Letter', 'Letter of Interest', 'Follow-up Letter', 'Thank You Letter'], validation: z.string().min(1, 'Letter type is required.'), defaultValue: 'Cover Letter' },
      { name: 'keySkills', label: 'Your Key Skills (comma-separated)', type: 'textarea', placeholder: 'e.g., JavaScript, Project Management, Communication', validation: z.string().min(3, 'Please list at least one skill.') },
      { name: 'yearsOfExperience', label: 'Years of Relevant Experience', type: 'text', placeholder: 'e.g., 5, 10+', validation: z.string().optional() },
      { name: 'letterTone', label: 'Desired Tone', type: 'select', options: ['Formal', 'Enthusiastic', 'Professional', 'Confident'], validation: z.string().min(1, 'Tone is required.'), defaultValue: 'Professional', colSpan: 2 },
    ],
  },
  'Application': {
    label: 'General Application',
    icon: FileText,
    description: 'Create letters for various applications like programs or memberships.',
    formFields: [
      { name: 'recipientName', label: 'Recipient Name / Organization Department', type: 'text', placeholder: 'e.g., Membership Committee, Dr. Emily White', validation: z.string().min(1, 'Recipient information is required.') },
      { name: 'organizationName', label: 'Organization/Program Name', type: 'text', placeholder: 'e.g., Tech Innovators Club, Summer Research Program', validation: z.string().min(1, 'Organization name is required.') },
      { name: 'applyingFor', label: 'What are you applying for?', type: 'text', placeholder: 'e.g., Club membership, Volunteer position, Grant', validation: z.string().min(1, 'Application subject is required.') },
      { name: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Your full name', validation: z.string().min(1, 'Your name is required.') },
      { name: 'relevantExperienceOrSkills', label: 'Relevant Experience or Skills', type: 'textarea', placeholder: 'Detail your qualifications that fit the application', validation: z.string().min(10, 'Please describe your experience/skills.') },
      { name: 'reasonForApplying', label: 'Reason for Applying', type: 'textarea', placeholder: 'Explain your motivation and interest', validation: z.string().min(10, 'Please state your reason for applying.'), colSpan: 2 },
    ],
  },
  'Report': {
    label: 'Report Summary/Cover',
    icon: ClipboardList,
    description: 'Generate cover letters or summaries for reports.',
    formFields: [
      { name: 'reportTitle', label: 'Title of the Report', type: 'text', placeholder: 'e.g., Quarterly Sales Analysis, Market Research Findings', validation: z.string().min(1, 'Report title is required.') },
      { name: 'preparedFor', label: 'Report Prepared For', type: 'text', placeholder: 'e.g., Board of Directors, Marketing Department', validation: z.string().min(1, 'Recipient of report is required.') },
      { name: 'preparedBy', label: 'Report Prepared By', type: 'text', placeholder: 'Your name or team name', validation: z.string().min(1, 'Preparer name is required.') },
      { name: 'submissionDate', label: 'Submission Date', type: 'text', placeholder: 'e.g., YYYY-MM-DD', validation: z.string().min(1, 'Date is required.') }, // Could use date picker later
      { name: 'reportObjective', label: 'Objective/Purpose of the Report', type: 'textarea', placeholder: 'Briefly state the main goal of the report', validation: z.string().min(10, 'Objective must be at least 10 characters.') },
      { name: 'keyFindingsSummary', label: 'Summary of Key Findings/Points', type: 'textarea', placeholder: 'Concisely summarize the most important information', validation: z.string().min(10, 'Summary must be at least 10 characters.'), colSpan: 2 },
    ],
  },
};
