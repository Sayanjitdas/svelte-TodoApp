  <script>
  export let label="";
  export let value="";
  </script>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">{label}</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" on:input>{value}</textarea>

  </div>