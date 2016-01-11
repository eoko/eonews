
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: "103434933160950",
      secret: "bcd70c690965d7611c005f0a3393055d"
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      clientId: '95c22212628e31de32bc',
      secret: '67ac413058c7bbe477158a2e2a4f7d4d7f259311'
    }
  }
);

