using GoldPriceApi.Models;
using GoldPriceApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GoldPriceApi.Controllers;

[ApiController]
[Route("api/goldprices")]
public sealed class GoldPricesController(GoldPriceService goldPriceService) : ControllerBase
{
    /// <summary>Returns every available karat, or only one when <c>?karat=</c> is supplied.</summary>
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<GoldPrice>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IReadOnlyList<GoldPrice>> GetAll([FromQuery] int? karat = null)
    {
        if (karat is null)
        {
            return Ok(goldPriceService.GetAllPrices());
        }

        var price = goldPriceService.GetPriceByKarat(karat.Value);
        return price is null ? NotFound() : Ok(new[] { price });
    }

    [HttpGet("history")]
    [ProducesResponseType<IReadOnlyList<HistoricalGoldPrice>>(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<HistoricalGoldPrice>> GetHistory() =>
        Ok(goldPriceService.GetHistory());

    [HttpGet("{karat:int}")]
    [ProducesResponseType<GoldPrice>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<GoldPrice> GetByKarat(int karat)
    {
        var price = goldPriceService.GetPriceByKarat(karat);
        return price is null ? NotFound() : Ok(price);
    }
}