<div class="ko-module__file-info-loader ko--stretch">
  {{#unless  isError}}
  <div>
    <h4>Five hosts with the most traffic:</h4>
    {{#each hostsWithMostTraffic as |item|}}
      <div class="item">
        <h5 class="item_label item_label--bar">
          {{item.value}}:
        </h5>
        <div class="item_count item_count--bar">
          {{item.count}}
        </div>
      </div>
    {{/each}}
  </div>

  <div>
    <h4>Five most requested files:</h4>
    {{#each mostRequestedFiles as |item|}}
      <div class="item">
        <h5 class="item_label">
          {{item.value}}:
        </h5>
        <div class="item_count">
          {{item.count}}
        </div>
      </div>
    {{/each}}
  </div>
  {{else}}
  <div class="error">
    Some error occurred while fetching/parsing the varnish.log file.
  </div>
  {{/unless}}
</div>
