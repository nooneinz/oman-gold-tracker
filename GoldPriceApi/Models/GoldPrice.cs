namespace GoldPriceApi.Models;

public sealed class GoldPrice
{
    public int Karat { get; init; }
    public decimal PricePerGram { get; init; }
    public string Currency { get; init; } = "OMR";
}

public sealed class HistoricalGoldPrice
{
    public string Date { get; init; } = string.Empty;
    public decimal K18 { get; init; }
    public decimal K21 { get; init; }
    public decimal K22 { get; init; }
    public decimal K24 { get; init; }
}