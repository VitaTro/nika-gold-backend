/** * @swagger
 *  components:
 *  schemas:
 *  InventoryItem:
 *  type: object
 *  required:
 *  - id
 *  - name
 *  - manufacturer
 *  - releaseDate
 *  properties:
 *  id:
 *  type: string
 *  format: uuid
 *  example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *  name:
 *  type: string
 *  example: Widget Adapter
 *  releaseDate:
 *  type: string
 *  format: date-time
 * example: 2016-08-29T09:12:33.001Z
 *  manufacturer:
 *  $ref: '#/schemas/Manufacturer' */

/**
 * @swagger
 *  /inventory:
 * get:
 *  tags: [developers]
 *  summary: searches inventory
 * operationId: searchInventory
 * description: |
 * By passing in the appropriate options, you can search for
 * available inventory in the system
 * parameters:
 * - in: query
 * name: searchString
 *  schema:
 *  type: string
 * description: pass an optional search string for looking up inventory
 *  - in: query
 *  name: skip
 *  schema:
 *  type: integer
 *  format: int32
 *  minimum: 0
 *  description: number of records to skip for pagination
 *  - in: query
 *  name: limit
 *  schema:
 *  type: integer
 *  format: int32
 *  minimum: 0
 *  maximum: 50
 *  description: maximum number of records to return
 *  responses:
 *  200:
 *  description: search results matching criteria
 *  content:
 *  application/json:
 *  schema:
 *  type: array
 *  items:
 *  $ref: '#/schemas/InventoryItem'
 *  400:
 *  description: bad input parameter */
