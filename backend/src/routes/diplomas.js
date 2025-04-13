import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import fs from 'fs';
const router = express.Router();

const MsGraphSharepointListUrl = `https://graph.microsoft.com/v1.0/sites/${process.env.SPSITE_CERTIFICATES_SITEID}/lists/${process.env.SPSITE_CERTIFICATES_LISTID}/items?$expand=fields`;

// Fetch certificates from SharePoint
router.get('/', async (req, res) => {
  try {
    const utilsPath = fs.realpathSync.native(join(__dirname, '../utils/sharepointUtils.js'));
    const utilsUrl = pathToFileURL(utilsPath).href; // Convert to file URL
    console.log(utilsUrl);
    const { getAllSpListItems, transformItems } = await import(utilsUrl);
    const data = await getAllSpListItems(MsGraphSharepointListUrl);
    const transformedData = transformItems(data); // Transform the data
    console.log(transformedData);
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
