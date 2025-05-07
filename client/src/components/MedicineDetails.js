import React, { useRef } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Breadcrumbs, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function MedicineDetails({ medicine }) {
  const detailRefs = useRef({});

  if (!medicine || !medicine.name) {
    return <Typography>Details: No details available.</Typography>;
  }

  const handleBreadcrumbClick = (key) => {
    detailRefs.current[key].scrollIntoView({ behavior: 'smooth' });
  };

  const renderDetailValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>
              {typeof item === 'object' && item !== null ? (
                <div>
                  {Object.entries(item).map(([subKey, subValue], subIndex) => (
                    <div key={subIndex} style={{ marginLeft: '20px' }}>
                      <Typography variant="subtitle2"><strong>{subKey}:</strong></Typography>
                      {renderDetailValue(subValue)}
                    </div>
                  ))}
                </div>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div>
          {Object.entries(value).map(([subKey, subValue], index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
              <Typography variant="subtitle2"><strong>{subKey}:</strong></Typography>
              {renderDetailValue(subValue)}
            </div>
          ))}
        </div>
      );
    } else {
      return <Typography>{value}</Typography>;
    }
  };

  return (
    <div>
      <Typography variant="h6">Details:</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        {Object.keys(medicine).map((key) => (
          <Link
            key={key}
            color="inherit"
            href="#"
            onClick={() => handleBreadcrumbClick(key)}
          >
            {key}
          </Link>
        ))}
      </Breadcrumbs>
      {Object.entries(medicine).map(([key, value]) => (
        <Accordion key={key} ref={(el) => (detailRefs.current[key] = el)} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><strong>{key}:</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderDetailValue(value)}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default MedicineDetails;
