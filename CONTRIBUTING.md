# Contributing to Chinese Historical Taxation Database

Thank you for your interest in contributing to this academic research project! This guide outlines how to contribute data, corrections, and improvements to our historical taxation database.

## Types of Contributions

### 1. Data Contributions
- New taxation data for Chinese dynasties not yet covered
- Additional data points for existing dynasties
- Comparative data from other civilizations
- Regional taxation variations and case studies

### 2. Source Verification
- Verification of existing data against additional sources
- Translation of non-English academic sources
- Cross-referencing with archaeological evidence
- Correction of errors or inconsistencies

### 3. Analysis and Visualization
- Statistical analysis scripts
- Data visualization tools
- Comparative studies and methodological improvements
- Documentation and tutorial materials

## Academic Standards

All contributions must meet strict academic criteria:

### Source Requirements
- **Peer-reviewed only**: Academic journals, university press publications, dissertations
- **Primary sources preferred**: Contemporary historical documents, administrative records
- **Multiple verification**: Each data point should be corroborated by independent sources
- **Complete citations**: Full bibliographic information in standard academic format

### Quality Standards
- **Transparency**: Clear methodology for data collection and analysis
- **Uncertainty acknowledgment**: Explicit statement of limitations and confidence levels
- **Bias awareness**: Recognition of potential sources of bias in historical records
- **Reproducibility**: Sufficient detail for others to verify and replicate findings

## Contribution Process

### Getting Started
1. **Fork the repository** to your GitHub account
2. **Create a branch** for your contribution: `git checkout -b feature/your-contribution-name`
3. **Review existing data** to understand structure and standards
4. **Check open issues** for suggested research priorities

### Data Submission Format

#### New Dynasty/Civilization Data
Follow the JSON schema established in existing files:
```json
{
  "metadata": {
    "dynasty/civilization": "Name",
    "period": "Date range",
    "last_updated": "YYYY-MM-DD",
    "data_reliability": "high/medium/low"
  },
  "taxation_system": {
    "overview": "Brief description",
    "major_reforms": []
  },
  "tax_categories": [],
  "academic_sources": []
}
```

#### Source Documentation
Each source must include:
- Author(s)
- Title
- Publication details (journal/publisher, year, pages)
- DOI or stable URL when available
- Brief assessment of source quality and relevance

### Review Process

#### Initial Review
1. **Automated checks**: JSON validation, required fields verification
2. **Source verification**: Confirmation of academic credentials
3. **Data consistency**: Comparison with existing database entries
4. **Format compliance**: Adherence to established schemas

#### Expert Review
1. **Subject matter expert consultation**: Review by historians specializing in relevant period
2. **Cross-verification**: Checking against additional independent sources
3. **Methodology assessment**: Evaluation of data collection and analysis methods
4. **Quality rating assignment**: Reliability score based on evidence quality

### Code Contributions

#### Analysis Scripts
- **Documentation**: Clear comments and methodology explanation
- **Dependencies**: Use standard libraries when possible, document all requirements
- **Reproducibility**: Include sample data and expected outputs
- **Testing**: Validate results against known benchmarks

#### Visualization Tools
- **Accessibility**: Clear legends, appropriate color schemes, readable fonts
- **Data accuracy**: Faithful representation of underlying data and uncertainties
- **Export capability**: Support for high-resolution academic publication formats

## Research Priorities

### High Priority Areas
1. **Song Dynasty**: Commercial taxation and fiscal innovations
2. **Regional variations**: Provincial differences in tax collection
3. **Ming-Qing transition**: Fiscal system changes during dynastic transition
4. **Comparative analysis**: Byzantine Empire taxation (6th-8th centuries)
5. **Methodology**: Improved GDP estimation techniques for ancient economies

### Medium Priority Areas
1. **Tang Dynasty**: Regional military taxation (fan zhen system)
2. **Yuan Dynasty**: Mongol taxation adaptations
3. **Tokugawa Japan**: Comparative analysis with Qing China
4. **Islamic world**: Abbasid and Ottoman taxation systems

### Long-term Goals
1. **Complete provincial data**: Systematic regional taxation patterns
2. **Social distribution**: Tax burden across social classes
3. **Economic impact**: Relationship between taxation and economic development
4. **Digital humanities**: Application of computational methods to historical analysis

## Style Guidelines

### Documentation
- **Clear language**: Accessible to both specialists and general academic audience
- **Consistent terminology**: Use established academic conventions
- **Proper attribution**: Credit all sources and contributors appropriately
- **Regular updates**: Maintain currency with latest scholarship

### Code Style
- **Python**: Follow PEP 8 guidelines
- **Comments**: Explain methodology and assumptions clearly
- **Variable names**: Use descriptive names reflecting academic concepts
- **Error handling**: Graceful handling of missing or uncertain data

## Community Guidelines

### Collaboration Principles
- **Respectful discourse**: Professional academic communication
- **Constructive feedback**: Focus on improving research quality
- **Credit sharing**: Acknowledge all contributors appropriately
- **Open science**: Commitment to transparent and reproducible research

### Conflict Resolution
1. **Discussion first**: Attempt resolution through GitHub issues or pull request comments
2. **Expert consultation**: Seek input from subject matter specialists
3. **Evidence-based decisions**: Priority given to stronger academic evidence
4. **Documentation**: Record rationale for contested decisions

## Recognition

### Contributor Acknowledgment
- **GitHub contributions**: Automatically tracked through commit history
- **Academic credit**: Major contributors acknowledged in repository documentation
- **Publication opportunities**: Collaboration on academic papers using database
- **Conference presentations**: Support for presenting research at academic conferences

### Data Citation
Contributors retain credit for their specific data contributions:
```
[Contributor Name] (Year). [Dynasty/Civilization] taxation data. 
In Chinese Historical Taxation Database. 
Retrieved from https://github.com/[username]/chinese-historical-taxation
```

## Technical Support

### Getting Help
- **GitHub Issues**: Technical questions and bug reports
- **Documentation**: Comprehensive guides in `/docs` directory
- **Example data**: Reference implementations in existing files
- **Community discussion**: Academic collaboration and methodology questions

### Development Environment
- **Python 3.8+**: Required for analysis scripts
- **Dependencies**: Listed in `requirements.txt`
- **Testing**: Run validation scripts before submitting
- **Documentation generation**: Use standard tools for API documentation

## Legal and Ethical Considerations

### Copyright and Licensing
- **Open access**: All contributions under Creative Commons Attribution 4.0
- **Source permissions**: Ensure right to redistribute academic sources
- **Fair use**: Appropriate use of copyrighted materials for academic purposes

### Research Ethics
- **Academic integrity**: No plagiarism or misrepresentation of sources
- **Bias acknowledgment**: Recognition of historical and methodological limitations
- **Responsible interpretation**: Avoid overstatement of uncertain conclusions

---

For questions about contributing, please open an issue or contact the repository maintainers. We welcome researchers from all backgrounds and career stages to participate in this collaborative academic project.