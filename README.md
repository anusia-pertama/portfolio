<div class="support-section"> <h2>❤️ Support My Work</h2> <p>If this project has helped you or you'd like to support future development, consider buying me a coffee! Your support means the world to me and helps me continue creating free resources.</p>
 <div class="support-buttons">
        <a href="https://buymeacoffee.com/adamngif" target="_blank" class="support-button coffee">
            ☕ Buy Me a Coffee
        </a>
        <a href="https://trakteer.id/adamngif" target="_blank" class="support-button trakteer">
            💝 Support on Trakteer
        </a>
    </div
    <p style="margin-top: 20px;">Thank you so much for your generosity! <span class="heart">❤️</span></p>
</div>

<h1 class="center">Project Setup Guide</h1>

<h2>🎯 Getting Started</h2>
<p>Follow these instructions to set up and customize this project for your needs.</p>

<h3>Prerequisites</h3>
<ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> and npm installed on your system</li>
</ul>

<hr>

<h2>📦 Installation</h2>
<h3>Download the project</h3>
<p><strong>Option 1:</strong> Download the repo as a ZIP file and extract it</p>
<p><strong>Option 2:</strong> Clone the repository using Git:</p>
<pre><code>git clone &lt;repository-url&gt;
cd &lt;repository-folder&gt;</code></pre>

<hr>

<h2>🎨 Customization</h2>

<div class="step">
    <h3>Create your color palette</h3>
    <p>1. Visit <a href="https://tweakcn.com" target="_blank">tweakcn.com</a></p>
    <p>2. Customize your color palette</p>
    <p>3. Copy the generated CSS code</p>
</div>

<div class="step">
    <h3>Apply your theme</h3>
    <p>4. Paste the copied CSS code into <code>src/placeholders/custom-theme.css</code></p>
</div>

<div class="step">
    <h3>Watch the full guide</h3>
    <p>For visual instructions, watch the tutorial:</p>
    <p><a href="https://youtu.be/YNzpjxY6ZMk?si=PaHGYUgQBLJLQanL" target="_blank" style="background-color: #FF0000; color: white; padding: 5px 10px; border-radius: 4px; text-decoration: none;">📺 VIDEO GUIDE</a></p>
</div>

<div class="step">
    <h3>Customize content</h3>
    <p>5. Open <code>string.ts</code> in the <code>src/placeholders/</code> directory</p>
    <p>6. Modify the content according to your needs</p>
    <p>7. Replace the logo and email information</p>
</div>

<div class="step">
    <h3>Add your artwork</h3>
    <p>8. Replace all the images for the backgorund in <code>public/assets/images/</code></p>
    <p>9. Place all illustrations in <code>public/assets/artworks/illustration/</code></p>
    <p>10. Place all timelapse GIFs in <code>public/assets/artworks/timelapse/</code></p>
    <div class="note">
        <strong>Important:</strong> Ensure illustration and timelapse files have the same name (case-sensitive)
    </div>
</div>

<div class="step">
    <h3>Using Google Drive for file storage</h3>
    <p>11. Upload your files to Google Drive and get the share link (enable "View" permission only)</p>
    <p>12. Example URL: <code>https://drive.google.com/file/d/&lt;FILE_ID&gt;/view?usp=sharing</code></p>
    <p>13. Use this format for embedding: <code>https://drive.usercontent.google.com/download?id=&lt;FILE_ID&gt;</code></p>
    <div class="note">
        <strong>Note:</strong> Large files may not display properly
    </div>
</div>

<div class="step">
    <h3>Update favicon</h3>
    <p>14. Replace <code>favicon.ico</code> with your own logo</p>
    <p>15. Use <a href="https://favicon.io" target="_blank">favicon.io</a> to generate your favicon</p>
</div>

<hr>

<h2>💻 Development</h2>

<h3>Install dependencies</h3>
<pre><code>npm install</code></pre>

<h3>Run the development server</h3>
<pre><code>npm run dev</code></pre>

<hr>

<h2>🚀 Deployment to Vercel</h2>

<h3>Option 1: Connect GitHub Repository</h3>
<p>1. Push your code to a GitHub repository</p>
<p>2. Go to <a href="https://vercel.com" target="_blank">vercel.com</a> and sign in</p>
<p>3. Click "New Project"</p>
<p>4. Import your GitHub repository</p>
<p>5. Configure project settings (if needed)</p>
<p>6. Click "Deploy"</p>

<h3>Option 2: Vercel CLI</h3>
<p>Install Vercel CLI globally:</p>
<pre><code>npm i -g vercel</code></pre>
<p>In your project directory, run:</p>
<pre><code>vercel</code></pre>
<p>Follow the prompts to configure your deployment</p>
<p>Deploy to production:</p>
<pre><code>vercel --prod</code></pre>

<h3>Option 3: Manual Deployment via Drag & Drop</h3>
<p>Build your project:</p>
<pre><code>npm run build</code></pre>
<p>The build output will be in the <code>dist</code> folder (or similar, depending on your framework)</p>
<p>Drag and drop the <code>dist</code> folder to <a href="https://vercel.com" target="_blank">vercel.com</a> dashboard</p>

<h3>Environment Variables (if needed)</h3>
<p>If your project requires environment variables:</p>
<p>1. Go to your project settings in Vercel dashboard</p>
<p>2. Add environment variables in the "Environment Variables" section</p>
<p>3. Redeploy your application</p>

<hr>

<h2>📝 Additional Notes</h2>
<ul>
    <li>Ensure all file paths are correct after customization</li>
    <li>Test your application thoroughly before deployment</li>
    <li>Check browser console for any errors during development</li>
</ul>

<hr>

<h2>❓ Support</h2>
<p>If you encounter any issues, please refer to the video guide or check the documentation of the specific framework used in this project.</p>
