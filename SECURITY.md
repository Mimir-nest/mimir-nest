# Security Policy

Mimir Nest is a student platform, and we take the security of the project, its contributors, and its users seriously.

If you discover a security vulnerability, we encourage responsible disclosure so that it can be investigated and addressed before the issue is made public.

## Reporting a Vulnerability

Please **do not open a public GitHub issue or pull request** for security vulnerabilities.

Instead, report the issue privately by contacting:

**mimirnest@gmail.com**

Please include as much of the following information as possible:

- A clear description of the vulnerability
- The affected feature, page, endpoint, or component
- Steps required to reproduce the issue
- The potential security impact
- A proof of concept, if available
- Relevant screenshots, logs, or other supporting information

You do not need to have a complete fix before reporting a vulnerability.

## What to Report

Security reports may include issues such as:

- Unauthorized access or privilege escalation
- Exposure of sensitive information
- Cross-site scripting (XSS)
- Injection vulnerabilities
- Authentication or authorization issues
- Insecure API behavior
- Server-side vulnerabilities
- Vulnerable or compromised dependencies
- Security issues introduced through third-party integrations
- Other issues that could negatively affect users or the project

For general bugs, feature requests, or questions, please use the project's GitHub Issues instead.

## Our Response

When a security report is received, we will make a reasonable effort to:

1. Review and acknowledge the report.
2. Reproduce and validate the reported issue.
3. Assess its severity and potential impact.
4. Develop and test an appropriate fix.
5. Release or deploy the fix where applicable.
6. Coordinate responsible disclosure with the reporter when appropriate.

Response and remediation times may vary depending on the severity, complexity, and scope of the issue.

## Responsible Disclosure

We ask security researchers and contributors to allow reasonable time for investigation and remediation before publicly disclosing a vulnerability.

Please avoid:

- Publicly posting an unpatched vulnerability
- Accessing or modifying data that does not belong to you
- Disrupting the availability of the service
- Performing destructive testing
- Social engineering of project contributors or users
- Accessing accounts or systems without authorization

Only test against systems and data you are authorized to access.

## Supported Versions

The following table outlines the current support status for security updates across major release series of Mimir Nest:

| Version Series | Support Status | Notes |
| :--- | :--- | :--- |
| `1.x.x` (Current) | :white_check_mark: Supported | Active development; security patches released for main branch. |
| `< 1.0.0` (Legacy Alpha) | :x: Unsupported | Deprecated preview builds; users should upgrade to current `1.x.x`. |

Because Mimir Nest is an actively developed project, support status may change as new releases are published.

## Dependency and Automated Security

Mimir Nest uses automated dependency and code-security tooling where appropriate to help identify known vulnerabilities and security issues.

Automated findings are reviewed based on their relevance, severity, and applicability to the project.

## Scope

This policy applies to the Mimir Nest project and its publicly maintained codebase.

Third-party services, infrastructure, and dependencies may have their own security policies and reporting procedures. Vulnerabilities originating entirely within those services may need to be reported to the respective provider.

## Contact

For security-related reports:

**mimirnest@gmail.com**

For general questions, bugs, and feature requests, please use GitHub Issues.

---

Thank you to the security researchers and contributors who help make Mimir Nest safer.
