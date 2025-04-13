import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import fs from 'fs';

const router = express.Router();

const MsGraphSharepointListUrl = `https://graph.microsoft.com/v1.0/sites/${process.env.SPSITE_APPLICATIONS_SITEID}/lists/${process.env.SPSITE_APPLICATIONS_LISTID}/items?$expand=fields($select=Title,CPR_x0020_med_x0020_bindestreg,Forl_x00f8_bLookupId,Forl_x00f8_b,Intern_x0020_status,Email,Lokation,Intern_x0020_kommentar,Optagelsesbrev,bekr_x00e6_ftelse,Ekstern_x0020_status,Adresse,Postnummer,Postdistrikt,Kommune,By,Mobil,Uddannelse,Prioritet,Startdato,Oprettet_x0020_eksternt,Sidst_x0020_rettet_x0020_ekstern,Dokumenter,ExtGUID,Forl_x00f8_b_x003a_Startdato,Forl_x00f8_b_x003a_StartdatoLookupId,Forl_x00f8_b_x003a_Slutdato,Forl_x00f8_b_x003a_SlutdatoLookupId,Lektio,Lectiokontrol,id,Attachments)&$filter=fields/Intern_x0020_status ne 'Afsluttet'`;

//const MsGraphSharepointListUrl = `https://graph.microsoft.com/v1.0/sites/${process.env.SPSITE_APPLICATIONS_SITEID}/lists/${process.env.SPSITE_APPLICATIONS_LISTID}/items?$expand=fields&$filter=(fields/Intern_x0020_status ne 'Afsluttet')`;


// Fetch applications from SharePoint
router.get('/applications', async (req, res) => {
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
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
