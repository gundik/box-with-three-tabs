<div class="ko-module ko-module__rss-feeds ko--stretch">
  {{#if this}}
    <table class="ko-table">
      <thead>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Description</th>
        <th>Source</th>
      </tr>
      </thead>
      <tbody>
        {{#each this}}
          <tr>
            <td>{{publicationDate}}</td>
            <td>
              <a href="{{articleLink}}" target="_blank">{{title}}</a>
            </td>
            <td>
              <a href="{{articleLink}}" target="_blank">{{description}}</a>
            </td>
            <td>{{source}}</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  {{else}}
    <h4>No data found</h4>
  {{/if}}
</div>
