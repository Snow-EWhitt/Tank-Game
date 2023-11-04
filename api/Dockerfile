FROM mcr.microsoft.com/dotnet/sdk:7.0 as build

WORKDIR /app
COPY *.csproj .
RUN dotnet restore
ENTRYPOINT ["dotnet", "watch", "run", "--AlwaysRestartOnRudeEdit"]
