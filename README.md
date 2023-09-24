
# STILL IN DEVELOPMENT

# Serverless send E-mails

This is a serverless project that utilizes Amazon SES for email sending, Handlebars for customized email templates, MongoDB for template storage, and Amazon SQS for background task processing.

# Key Features
- Efficient Email Sending: Uses Amazon SES for efficient and reliable email delivery.

- Custom Email Templates: Creates dynamic email templates with Handlebars.js.

- Events Storage in MongoDB: Stores email events in MongoDB.

- Background Processing: Configures Amazon SQS events for background task processing.

- Simple Configuration: Utilizes the Serverless Framework for setup and deployment.

- Flexibility and Scalability: Automatically scales and adapts to demands.
Configuration

- Ensure you configure the necessary environment variables for API keys and MongoDB connection.


## Configuration

```bash
mv serverless.yml.example serverless.yml.
mv .env.example .env
```




## Author

- [@gustavolopesv3](https://www.github.com/gustavolopesv3)



